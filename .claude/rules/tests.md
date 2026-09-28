---
paths:
  - "tests/**/*.{ts,tsx}"
---

# Testes

Jest (`jest-expo`) + React Native Testing Library + MSW. `yarn test` roda tudo.

## Onde fica cada coisa

Teste **nunca** fica em `src/`. A pasta `tests/` espelha `src/`, e o teste tem o nome do arquivo
que cobre com `.test`:

```
src/shared/utils/maskDate.ts                   → tests/shared/utils/maskDate.test.ts
src/presentation/screens/Home/Home.tsx         → tests/presentation/screens/Home/Home.test.tsx
src/data/config/apiError.ts                    → tests/data/config/apiError.test.ts
```

A infraestrutura de teste mora em `tests/support/` e não espelha nada:

| Caminho                          | Para quê                                                   |
| -------------------------------- | ---------------------------------------------------------- |
| `support/env.ts`, `setup.ts`     | carregados pelo `jest.config.js`: env, mocks globais, MSW  |
| `support/render.tsx`             | `renderApp()` e `seedSession()` — o app inteiro, com sessão |
| `support/server.ts`              | servidor MSW com os handlers padrão (`/me`, `/meals`)      |
| `support/fixtures/`              | `build<Entidade>(overrides)` para montar respostas da API  |
| `support/mocks/`                 | substitutos de módulos nativos (sheet, swipe, áudio…)      |
| `support/*.ts` restantes         | helpers de asserção e navegação (`spyOnAlert`, `waitForHome`) |

Todo import é por alias (`presentation/…`, `data/…`, `shared/…`, `tests/support/…`). Caminho
relativo só dentro de `tests/support/`.

## O que testar e como

- **Screen:** teste de fluxo pelo app inteiro (`renderApp()`), navegando como o usuário até a tela e
  afirmando pelo que aparece (`getByRole`, `getByText`, `getByLabelText`). A API é o MSW; guarde as
  chamadas recebidas num objeto `calls` e afirme o body enviado. Não mocke controller nem useCase.
- **Função pura** (`utils/`, schema, `apiError`): teste unitário direto, sem render.
- Cada screen cobre os três estados (carregando, vazio/erro com "tentar de novo", conteúdo) e os
  erros da API que o usuário vê.
- Data e hora fixas com `jest.useFakeTimers({ now, advanceTimers: true })`, desfeito num
  `afterEach`. O `TZ` dos testes é `America/Sao_Paulo`.
