# Nutrail App

App React Native (Expo) do Nutrail — diário alimentar com IA. O usuário registra a refeição por foto,
áudio ou texto e acompanha calorias e macros do dia contra as próprias metas. Consome a
`nutrail-api` (repositório irmão `../nutrail-api`), que é a fonte de verdade do contrato:
controllers e schemas em `src/presentation/controllers`, códigos de erro em `src/application/errors`
e `src/domain/errors`, e as rotas na seção 7.5 de `docs/ARCHITECTURE.md`.

A organização de pastas e os padrões de código vêm do `../../myfood/myfood-app`. Ele é
**exemplo**, não fonte de verdade: onde este repositório divergir, este vence.

## Como trabalhar aqui

- **Faça só o que foi pedido.** Sem passos, refatorações ou arquivos que o pedido não chamou.
  Achou um problema em outro lugar, relate em vez de corrigir no caminho.
- **Converse em português.** Código, identificadores, títulos de teste, commits e o README ficam em
  inglês; o texto da interface é em português.
- **Commit só quando pedido**, na branch atual. Nunca criar branch, dar push ou amend sem pedido.
- **Nunca** suba o Metro (`yarn start`), nem rode `yarn ios`, `yarn android` ou `expo prebuild` sem
  o Pedro pedir explicitamente.

## Onde ficam as regras

As regras detalhadas ficam em `.claude/rules/`, carregadas por caminho:

| Arquivo             | Cobre                                                      |
| ------------------- | ---------------------------------------------------------- |
| `core.md`           | camadas, imports, tipos, funções, proibições               |
| `components.md`     | screens, componentes, layouts                              |
| `controllers.md`    | estado e handlers                                          |
| `data-layer.md`     | client, módulos, erros da API, datas, sessão               |
| `design-system.md`  | tokens do Figma, `AppText`, papéis de cor, medidas         |
| `navigation.md`     | stacks, param list, header                                 |
| `tests.md`          | onde ficam os testes, `tests/support`, o que testar        |

Os fluxos de trabalho são skills que orquestram subagents especialistas:

- `/feature-builder` — uma feature de ponta a ponta: spec → `app-builder` → `test-writer` →
  verificação → `code-reviewer`.
- `/bug-fixer` — reproduz com um teste que falha, corrige, verifica e revisa.

## Verificação

Depois de qualquer alteração:

```bash
yarn typecheck && yarn lint && yarn test
```

## Stack

- Expo SDK 57 + React Native 0.86 + React 19 + TypeScript strict
- NativeWind 4 (Tailwind **3.4**) + `class-variance-authority` + `tailwind-merge`
- React Query 5 + axios · React Navigation 7 (native stack)
- `@gorhom/bottom-sheet` para **todo** bottom sheet · React Hook Form + Zod
- `expo-camera`, `expo-image-picker`, `expo-image-manipulator` e `expo-audio` para a foto e o áudio
  da refeição · `expo-secure-store` para a sessão
- Biome · yarn 1 · Husky + lint-staged · Jest (`jest-expo`) + RNTL + MSW · GitHub Actions

Dependência entra quando a primeira feature precisa dela, não antes.

## Arquitetura

```
src/data/           config, libs, contexts, modules/<dominio>/{types,keys,services,useCases}
src/presentation/   screens, components, layouts — só UI + controllers
src/shared/         navigation, utils, constants, entities, hooks, assets
```

`presentation → data → shared`, nunca o contrário. Alias sem `@` (`data/*`, `presentation/*`,
`shared/*`, `tests/*`), só no `tsconfig.json`.

## Padrões

- Named export; `export default` só em `App.tsx`.
- Função declarada (`function x() {}`), arrow só como argumento.
- Toda `interface` começa com `I`; `type` só para union/mapped e sem prefixo.
- Pasta por peça em PascalCase: `<Nome>.tsx`, `<Nome>Types.ts`, `use<Nome>Controller.ts`. O `.tsx`
  só tem JSX; estado, efeitos, handlers e chamadas a `data/` ficam no controller.
- Handlers começam com `handle` e recebem um objeto de params tipado.
- useCase devolve objeto com nome de domínio (`{ signIn, isSigningIn }`), não o retorno cru do
  React Query. Método de service não repete o nome do service (`MealService.list()`).
- Sem `any`, sem `as` para calar o compilador, sem `enum`, sem `console.log`, sem comentários.
- Indentação de 2 espaços (`.editorconfig`), aspas simples, sem trailing comma.

## Regras inegociáveis

1. **A `date` e o `time` da refeição são locais.** Saem do relógio do aparelho, nunca de
   `toISOString()`, que muda o dia depois das 21h no Brasil.
2. **A mensagem de erro vem do `code`.** O texto em português mora no `API_ERROR_MESSAGES` de
   `data/config/apiError.ts`; a `message` da API nunca aparece na tela.
3. **O formulário espelha o schema da API.** Mesmos limites e formatos, para `VALIDATION` nunca
   chegar à tela.
4. **Sessão só pelo `AuthProvider`.** Tokens no SecureStore pelo `AuthTokensManager`, refresh único
   compartilhado no interceptor de 401, e as rotas de auth pelo `publicApi`.
5. **Os totais do dia vêm da API.** O app só recalcula os macros de um item quando a quantidade muda
   na mesma unidade (regra de três); qualquer outra mudança passa pela análise da API.

## Decisões de produto

- Login obrigatório, com refresh de sessão e recuperação de senha.
- Sem bottom tab.
- Mensagens de erro em português mapeadas no app pelo `code` da API (`data/config/apiError.ts`).
- Light-only.
