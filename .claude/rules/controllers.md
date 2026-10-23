---
paths:
  - "src/presentation/**/use*Controller.ts"
---

# Controllers

Todo estado e toda lógica de um componente ou screen vivem num controller ao lado dele. O `.tsx`
não tem `useState`, `useEffect`, handler nem chamada a `data/`.

Nome: `use<Nome>Controller.ts`, exportando `use<Nome>Controller()`. O `<Nome>` é o do componente ou
screen que ele serve — um controller pertence a exatamente um deles.

## Formato

```ts
import { useState } from 'react';
import { useListMealsByDay } from 'data/modules/meal/useCases/listMealsByDay/useListMealsByDay';
import type { IHandleSelectDateParams } from './HomeTypes';

export function useHomeController() {
  const [selectedDate, setSelectedDate] = useState(today);
  const { meals, isLoadingMeals } = useListMealsByDay({ date: selectedDate });

  function handleSelectDate({ date }: IHandleSelectDateParams) {
    setSelectedDate(date);
  }

  return {
    meals,
    isLoadingMeals,
    selectedDate,
    handleSelectDate
  };
}
```

## Regras

- Retorne **um objeto** com o que a view consome. Sem tupla, sem posicional.
- Handlers recebem **um objeto de params tipado**, nunca argumentos posicionais:
  `handleSelectDate({ date })`. A interface do param vai no `<Nome>Types.ts` ao lado, com
  prefixo `I`.
- Handlers começam com `handle`. Valores derivados não — exponha o valor pronto
  (`shouldShowEmptyState`, `caloriesLabel`), não a função que calcula.
- O controller decide; a view só renderiza. Se um ternário no JSX cresceu, o booleano que ele testa
  devia vir pronto do controller.
- Chamadas a `data/` entram aqui, não no `.tsx`. Estado de request (`isLoading`, `error`) é estado
  de controller.
- Controller não renderiza nada e não importa JSX.
- Envio de formulário é uma função declarada sem parâmetro que chama `handleSubmit(onSubmit)()`
  (`function handleSave() { return handleSubmit(onSubmit)(); }`), nunca `handleSubmit(onSubmit)`
  exposto direto: no React Native 0.88 o tipo do evento do `onPress` não é compatível com o
  parâmetro opcional do React Hook Form. Quando a chave devolvida é `handleSubmit`, a função se chama
  `handleSubmitForm`, para não sombrear a do `useForm`.
- Controller de componente pode receber params — um objeto tipado, mesma regra dos handlers.
  Controller de screen não recebe nada: o que ele precisa vem da rota, via `useRoute`.

## Quando NÃO criar

Componente sem estado e sem handler não ganha controller — controller vazio é ruído. No momento em
que ele ganhar o primeiro `useState`, crie o controller e mova; não coloque o `useState` no `.tsx`
"só dessa vez".

## Compartilhar lógica entre controllers

Controller serve um componente só. Lógica que dois controllers precisam vira um hook em
`shared/hooks/` — não importe um controller dentro de outro.

## Erro de API

O `catch` mora aqui, não num interceptor. O texto sai de `getApiErrorMessage(error)`, que traduz o
`code` da API — nunca escreva mensagem de erro no controller. Ver `data-layer.md`.
