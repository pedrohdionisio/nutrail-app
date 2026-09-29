---
paths:
  - "src/data/**/*.{ts,tsx}"
---

# Camada de data

Tudo que fala com o mundo externo: endpoints HTTP, clients, DTOs, mappers, storage do device,
integrações nativas. Regra de tela não entra aqui.

## Fronteiras

- `data/` **nunca** importa de `presentation/`. Pode importar de `shared/`.
- React só aparece nos **useCases** (hooks do React Query) e em `contexts/`. `config/`, `libs/`,
  `services/`, `mappers/` e `types/` ficam sem hook e sem JSX.
- O consumidor recebe uma Promise de dado já tipado. Header, query string, status HTTP e parsing
  não vazam para cima.

## Client e estado de servidor

`axios` para transporte, `@tanstack/react-query` para estado de servidor. As instâncias ficam em
`data/config/api.ts`; a base URL vem de `data/config/env.ts` (`EXPO_PUBLIC_API_URL`, o API Gateway
da `nutrail-api`). Nenhum `axios.create()` fora dali.

O Metro faz inline de `process.env.EXPO_PUBLIC_*` em build time, então a variável é lida por
**referência estática** — desestruturar `process.env` devolve `undefined`. Variável nova entra no
schema e no objeto que o `env.ts` monta. Variável inválida lança no carregamento, com o nome dela.

O `queryClient` é instanciado em escopo de módulo, nunca dentro do render.

`EXPO_PUBLIC_REQUEST_DELAY_MS` atrasa toda request em dev, para dar tempo de ver o estado de
carregando. Fora de `__DEV__` o `env.ts` zera o valor e o `api.ts` não registra o interceptor.

## Organização

```
src/data/modules/meal/
├── types/MealTypes.ts                     # DTOs: o formato do wire
├── keys/MealKeys.ts                       # chaves de query e mutation, `as const`
├── services/MealService.ts                # uma função por endpoint
├── mappers/MealMapper.ts                  # DTO -> entidade, só se houver transformação
└── useCases/listMealsByDay/
    ├── useListMealsByDay.ts               # o hook que a presentation consome
    └── schemas/listMealsByDaySchema.ts    # zod, quando o caso de uso tem formulário
```

Um módulo por recurso da API: `auth`, `me`, `profile`, `goals`, `meal`, `recipe`.

Arquivo que exporta objeto nomeado repete o nome em PascalCase (`MealService.ts`); arquivo que
exporta função ou constante solta fica em camelCase (`useListMealsByDay.ts`).

Método de service não repete o nome do service: `MealService.list()`, `MealService.getById()`,
`RecipeService.suggest()`. O qualificador volta quando sem ele o nome fica ambíguo
(`MealService.createPictureUpload()`). O hook do useCase leva o nome inteiro (`useListMealsByDay`).

## useCases

Um caso de uso por pasta, com o nome da ação. O hook devolve **um objeto** com nome de domínio:

```ts
export function useSignIn() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [AUTH_MUTATION_KEYS.SIGN_IN],
    mutationFn: AuthService.signIn
  });

  return {
    signIn: mutateAsync,
    isSigningIn: isPending
  };
}
```

O useCase não guarda estado de tela, não navega e não mostra mensagem — isso é do controller.

### Schema de formulário

Cada caso de uso tem **um** schema, e todos os campos são escritos dentro dele. Sem schema por
campo (`emailSchema`, `birthDateSchema`), sem pasta `schemas/` no nível do módulo e sem helper que
gera campo (`goalSchema(min)`): se dois formulários validam o mesmo campo, a regra aparece escrita
nos dois.

## DTO x entidade

O DTO espelha a API; a entidade é o que o resto do app consome, em `shared/entities/`. O mapper é
a única ponte, e **nenhum DTO atravessa para `presentation/`**.

Mapper só existe quando há transformação de verdade. Se o wire já chega no formato do domínio, o
service tipa a resposta com a entidade e devolve.

## Datas

`date` e `birthDate` trafegam em `YYYY-MM-DD`. A `date` de uma refeição é o **dia local do
usuário** e sai do app — nunca derive de `toISOString()`, que converte para UTC e muda o dia
depois das 21h no Brasil. `createdAt` chega em ISO 8601 UTC e só é convertido para exibir.

## Erros

A `nutrail-api` responde erro como `{ error: { code, message, details? } }`. A `message` é técnica
e em inglês, então **o app não a exibe**: o texto mora no grupo `errors` dos dicionários
(`data/config/locales`), um por `code`, nos dois idiomas. Ver `i18n.md`.

- `getApiErrorMessage(error)` para exibir; `getApiErrorCode(error)` para ramificar.
- Código que o app não conhece (inclusive `INTERNAL` e `INVALID_JSON`) cai no genérico. Sem
  resposta (rede fora, timeout), cai na mensagem de conexão.
- A API ganhou um código novo que o usuário precisa entender → entra no `API_ERROR_CODES` de
  `data/config/apiError.ts` e em `errors.<code>` nos dois dicionários. A
  fonte é `src/application/errors` e `src/domain/errors` da `nutrail-api`; nada liga os dois
  automaticamente.
- `VALIDATION` não deveria chegar à tela: o formulário valida com Zod antes, espelhando o schema da
  API (`src/presentation/controllers/*/schemas`).

### Sem interceptor de erro

O axios não intercepta erro para exibir nada — o `catch` fica no controller, que decide se mostra.
O único interceptor de resposta é o de **401**, e ele não exibe nada: só renova a sessão e, se
não der, encerra.

## Sessão

Login é obrigatório. Endpoints (todos pelo `publicApi`, a instância sem interceptor, exceto `/me`),
no módulo `auth` — recuperação de senha inclusa:

| Ação                  | Endpoint                          | Resposta                         |
| --------------------- | --------------------------------- | -------------------------------- |
| Entrar                | `POST /auth/sign-in`              | `{ accessToken, refreshToken }`  |
| Cadastrar             | `POST /auth/sign-up`              | 201, `{ accessToken, refreshToken }` — body `{ account, profile }`; as metas são calculadas pela API e lidas em `GET /me` |
| Renovar               | `POST /auth/refresh-token`        | `{ accessToken, refreshToken }`  |
| Pedir código          | `POST /auth/forgot-password`      | 204                              |
| Redefinir senha       | `POST /auth/forgot-password/confirm` | 204 — body `{ email, code, password }` |
| Usuário da sessão     | `GET /me`                         | —                                |

Tokens no `expo-secure-store`, via `data/libs/AuthTokensManager.ts`, em chaves separadas
(`nutrail.auth.access-token`, `nutrail.auth.refresh-token`). O SecureStore só aceita chave
alfanumérica mais `.`, `-` e `_`, e avisa acima de 2048 bytes por valor — por isso não se guarda
os dois JWT num JSON só.

O refresh **sempre** regrava o par que voltou: hoje o Cognito devolve o mesmo refresh token, mas o
contrato da API permite rotação.

A sessão vive em `data/contexts/AuthProvider`, em dois passos: `activateSession(tokens)` grava, liga
o header e o interceptor; `enterApp()` troca para o `AppStack`. O login chama os dois em sequência;
o cadastro chama só o primeiro, busca `GET /me` para o resumo do plano e deixa o `enterApp()` para
o "Começar meu plano" — senão a navegação troca de stack antes do resumo aparecer. `signOut()`
desfaz tudo e limpa o cache do React Query. No boot, token guardado já
abre a sessão — o primeiro 401 é quem descobre se ela ainda vale.

O interceptor de 401 em `api.ts` é instalado pelo `AuthProvider` só enquanto existe sessão, e tem
três detalhes obrigatórios:

- **A promise do refresh é compartilhada.** Várias requests com 401 juntas disparam **um** refresh.
- **O header é reaplicado antes do replay.** O `config` do erro já tem o token antigo.
- **401 depois de renovar desloga.** Sem isso a sessão fica viva e quebrada.

`sign-in`, `sign-up`, `refresh-token` e `forgot-password` saem pelo `publicApi`, sem interceptor:
um 401 no refresh pelo `api` reentraria no interceptor e travaria esperando a própria promise.
