---
paths:
  - "src/shared/navigation/**/*.{ts,tsx}"
---

# Navegação

React Navigation 7, native stack. Todo o roteamento vive em `src/shared/navigation/` — a pasta da
screen exporta só o componente e nunca registra a própria rota. Sem Expo Router: ele exigiria uma
pasta `app/` competindo com `presentation/screens/`.

## Arquivos

```
src/shared/navigation/
├── AppRoutesTypes.ts    # os param lists e a augmentação global
├── AuthStack.tsx        # sem sessão: Welcome (login e recuperação são sheets dela) e Onboarding
├── AppStack.tsx         # com sessão
└── Navigation.tsx       # NavigationContainer + a escolha entre os stacks
```

**Login é obrigatório na entrada**: `Navigation` decide pelo `signedIn` do `useAuth()` — sem
sessão, `AuthStack`; com sessão, `AppStack`. Não existe rota pública dentro do `AppStack`, e não se
espalha guarda de sessão por screen. Uma screen de um stack nunca navega para outro.

**Sem bottom tab**, por decisão de produto. Navegação entre áreas é por push no `AppStack`.

## Param list

Um param list por stack, e a augmentação global junta todos:

```ts
export type AuthRoutesParamList = {
  SignIn: undefined;
  ResetPassword: { email: string };
};

export type AppRoutesParamList = {
  Home: undefined;
  Meal: { mealId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthRoutesParamList, AppRoutesParamList {}
  }
}
```

O param list é `type`, **não** `interface`: o React Navigation exige index signature implícita, e
trocar para `interface` quebra o `createNativeStackNavigator` com `TS2344`. A augmentação é o que
faz `useNavigation()` vir tipado, e é a única exceção ao "sem `namespace`" — declaração ambiente,
sem runtime.

## Sheet não é rota

Conteúdo que cobre parte da tela atual é bottom sheet (`components.md`), não `Stack.Screen` — nem
com `presentation: 'modal'`/`'formSheet'`. Rota nova só para tela inteira.

## Fluxo em etapas numa rota só

O `Onboarding` é **uma** rota com as etapas em estado do controller (`stepId`), porque todas
alimentam um formulário só (`signUpSchema`), validado etapa a etapa com `trigger(fields)`. O voltar
do header e o voltar do sistema recuam uma etapa via `usePreventRemove`; da primeira etapa, saem da
rota. Depois do cadastro o voltar fica bloqueado — a conta já existe.

## Rota nova

Entra em **dois** lugares, sempre juntos: a entrada no param list (params ou `undefined`) e o
`<Stack.Screen>` no navigator. Nome de rota em PascalCase, igual ao nome da screen.

## Navegar e ler params

Do controller, nunca do `.tsx`:

```ts
export function useMealController() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<AppRoutesParamList, 'Meal'>>();

  function handleGoBack() {
    navigation.goBack();
  }

  return { mealId: params.mealId, handleGoBack };
}
```

## Header

`headerShown: false` é o default: header é componente nosso, dentro da screen — voltar à esquerda
e título centralizado, como em "Suas Metas". Header nativo só com motivo explícito.
