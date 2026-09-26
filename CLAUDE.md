# Nutrail App

App React Native (Expo) do Nutrail — diário alimentar. Consome a `nutrail-api` (repositório irmão
`../nutrail-api`).

A organização de pastas e os padrões de código vêm do `../../myfood/myfood-app`. Ele é
**exemplo**, não fonte de verdade: onde este repositório divergir, este vence.

As regras detalhadas ficam em `.claude/rules/`, carregadas por caminho:

| Arquivo             | Cobre                                                      |
| ------------------- | ---------------------------------------------------------- |
| `core.md`           | camadas, imports, tipos, funções, proibições               |
| `components.md`     | screens, componentes, layouts                              |
| `controllers.md`    | estado e handlers                                          |
| `data-layer.md`     | client, módulos, erros da API, datas, sessão               |
| `design-system.md`  | tokens do Figma, `AppText`, papéis de cor, medidas         |
| `navigation.md`     | stacks, param list, header                                 |

## Verificação

Depois de qualquer alteração:

```bash
yarn typecheck && yarn lint && yarn test
```

**Nunca** suba o Metro (`yarn start`), nem rode `yarn ios`, `yarn android` ou `expo prebuild` sem
o Pedro pedir explicitamente.

## Stack

- Expo SDK 57 + React Native 0.86 + React 19 + TypeScript strict
- NativeWind 4 (Tailwind **3.4**) + `class-variance-authority` + `tailwind-merge`
- React Query 5 + axios · React Navigation 7 (native stack)
- `@gorhom/bottom-sheet` para **todo** bottom sheet · React Hook Form + Zod
- Biome · yarn 1 · Husky + lint-staged · Jest (`jest-expo`) + RNTL · GitHub Actions

Dependência entra quando a primeira feature precisa dela (react-hook-form, secure-store,
lucide, msw…), não antes.

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

## Decisões de produto

- Login obrigatório, com refresh de sessão e recuperação de senha.
- Sem bottom tab.
- Mensagens de erro em português mapeadas no app pelo `code` da API (`data/config/apiError.ts`).
- Light-only.
