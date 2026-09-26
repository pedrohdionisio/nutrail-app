---
paths:
  - "src/presentation/**/*.tsx"
  - "tailwind.config.js"
  - "src/shared/constants/colors.ts"
  - "src/shared/utils/cn.ts"
---

# Design system

O app tem um vocabulário fechado de cor, fonte e tamanho, tirado do style guide do Figma
(páginas "Text" e "Colors"). Interface nova compõe o que já existe; ela não inventa token.

## Texto

Todo texto passa por `AppText` — nunca `<Text>` do React Native direto.

| `size`   | Token do Figma      | Tamanho / altura      | Peso padrão |
| -------- | ------------------- | --------------------- | ----------- |
| `caption` | caption            | 16 / 22, upper, +8%   | medium      |
| `title1` | title/title1        | 32 / 42, -1%          | semibold    |
| `title2` | title/title2        | 16 / 24               | semibold    |
| `bodyXl` | body/xl             | 20 / 26               | medium      |
| `body`   | body/base           | 16 / 24               | regular     |
| `bodySm` | body-sm             | 14 / 20               | regular     |
| `bodyXs` | body-xs             | 12 / 16               | regular     |

- `weight`: `regular` · `medium` · `semibold`. Omitido, vale o peso padrão do tamanho
  (`DEFAULT_WEIGHT_BY_SIZE`). Passe `weight` só quando o Figma usa outra variante daquele tamanho
  (`body/medium`, `body-sm/semibold`…).
- `color`: `default` (black-700) · `muted` (gray-700) · `inverse` (branco) · `inverseMuted`
  (gray-600, texto secundário sobre fundo escuro) · `brand` (lime-500) ·
  `error` (support-red). `brand` é para texto sobre fundo escuro (link da tela de boas-vindas);
  sobre branco o lime não tem contraste para texto.
- `align`: `left` · `center` · `right`.

Cada `size` já carrega tamanho, `line-height` e `letter-spacing`. Não empilhe `leading-*` nem
`tracking-*` por cima, nem `font-bold`: no React Native o peso vem do arquivo da fonte, e quem
escolhe o arquivo é `weight`.

A família é uma só: **Host Grotesk**, pesos 400, 500 e 600, carregados no `App.tsx`. Precisou de
tamanho ou peso fora da escala → **pare e pergunte**. Não escreva `text-[15px]` solto.

### Line-height mínimo: 1,27× o tamanho

A Host Grotesk tem ascent 1,015em e descent 0,315em. Com `lineHeight` menor que a altura natural,
o iOS guarda o descent e sobra só `lineHeight − 0,315 × tamanho` acima da baseline; o que passa
disso é cortado no topo da caixa do texto. A maiúscula acentuada (`É`, `Á`) chega a 0,952em, então
o `lineHeight` precisa ser pelo menos **1,27×** o tamanho. Por isso `caption`, `title1`, `bodyXl` e
`bodyXs` fogem da altura do Figma (16/16, 32/32, 20/24, 12/12 cortavam). Tamanho novo segue a
mesma conta.

### `TextInput` não usa tamanho com line-height apertado

No iOS, `TextInput` com `lineHeight` igual ao tamanho da fonte corta a parte de cima e de baixo dos
glifos — e o `title-1` do Figma é 32/32. Campo editável nesse tamanho usa `text-title-1-input`
(mesmo tamanho e tracking, **sem** line-height) com altura explícita (`h-14`), e o iOS centraliza o
texto. `text-body` (16/24) não tem o problema porque a linha é maior que a fonte.

### Tamanho novo entra em três lugares

1. `fontSize` no `tailwind.config.js`;
2. `appTextVariants` em `AppTextStyles.ts`;
3. o grupo `font-size` do `extendTailwindMerge` em `shared/utils/cn.ts`.

O terceiro não é detalhe. O `tailwind-merge` não conhece tamanho customizado e trata
`text-body-sm` como **cor**. Sem o registro, `cn('text-body-sm', 'text-gray-700')` descarta o
tamanho sem erro nenhum. O `cn.test.ts` cobre os tamanhos atuais.

## Cor

Fonte única: `tailwind.config.js`, espelhado em `shared/constants/colors.ts`. Cor nova entra nos
dois ou em nenhum.

```
lime     400 #E8FB86 · 500 #BEF264 · 600 #A2E635 · 700 #64A30D · 800 #1A2E05 · 900 #022C22
support  ambar #FFFF00 · green #10B981 · orange #F4A462 · red #EF4444 · teal #2A9D90
         tomato #E76E50 · yellow #E8C468
gray     100 #FAFAFA · 200 #F4F4F5 · 300 #F3F4F6 · 400 #E4E4E7 · 500 #D9D9D9
         600 #A1A1AA · 700 #71717A
black    600 #1E293B · 700 #18181B · 800 #09090B · 900 #000000
white    #FFFFFF
```

A paleta **substitui** a do Tailwind (`theme.colors`, não `theme.extend.colors`). Só existem essas
cores mais `transparent` e `current`: `bg-red-500` e `bg-gray-50` não geram nada, e o NativeWind
não reclama de classe inexistente. Confira a classe contra o `tailwind.config.js` antes de escrever.

`ambar` é o nome que está no Figma; fica assim até o Figma mudar.

- Em JSX: `className='bg-lime-500'`, `text-gray-700`, `border-gray-400`.
- Em prop que exige valor (ícone, `placeholderTextColor`, `ActivityIndicator`): `COLORS.gray[700]`.
- Hex literal no meio de um componente é erro.

### Papéis, tirados das telas

| Papel                       | Token          |
| --------------------------- | -------------- |
| Fundo de tela               | `white`        |
| Texto principal             | `black-700`    |
| Texto secundário, unidade   | `gray-700`     |
| Ação principal              | `lime-500`, texto `black-700` |
| Ação secundária             | `gray-300`, texto `black-700` |
| Borda de input e divisor    | `gray-400`     |
| Superfície de apoio (chip)  | `gray-100`     |
| Erro                        | `support-red`  |

`gray-700` é o piso de texto legível: é o único cinza que passa WCAG AA sobre branco (4.8:1). Do
`gray-600` para baixo é borda, fundo e ícone decorativo, não texto que precisa ser lido.

## Espaçamento e forma

Escala do Tailwind, mais um token: `13` = 52px, a altura de input e botão (`h-13`).

Medidas da tela de referência ("Suas Metas"):

- margem lateral da tela: 20px (`px-5`, já no `ScreenLayout`);
- input: `h-13 rounded-xl border border-gray-400 bg-white px-4`, texto `body`; em foco a borda vira
  `black-700`, com erro `support-red`. É o `presentation/components/Input` (ligado ao
  react-hook-form), com rótulo em `bodySm` como no login. Dentro de bottom sheet ele troca sozinho
  para `BottomSheetTextInput`;
- chip de unidade ao lado do input: `h-13 w-14 rounded-xl bg-gray-100`, texto `body` `muted`,
  separado por `gap-2`;
- rótulo do campo: `body` `medium`;
- botão: `h-13 rounded-xl`, texto `body` `medium`;
- rodapé de ação: `border-t border-gray-400`, `pt-5`, dois botões `flex-1` com `gap-4`,
  secundário à esquerda e principal à direita;
- header: voltar à esquerda, título centralizado em `body`.

Valor arbitrário (`py-[14px]`) é aceito quando o design pede um número fora da escala, mas é
exceção. Safe area vem de `react-native-safe-area-context`, nunca de constante chutada.

## Telas de autenticação

Sem sessão existe **uma** tela, `Welcome`: foto de fundo (`shared/assets/login-bg.png`), degradê
escuro, logo fixo no topo e status bar clara (`Welcome/components/WelcomeBackground`). Login,
recuperação e nova senha **não são rotas**: são bottom sheets abertos sobre ela
(`Welcome/components/*Sheet`), todos pelo `AuthSheet` — `BottomSheetModal` sem handle, backdrop
transparente que fecha no toque, `stackBehavior='replace'` (abrir um fecha o outro), `topInset`
que para abaixo do logo, título `title1`, descrição opcional em `bodySm` `muted`, `gap-6` entre
campos.

O botão de envio fica desabilitado (`opacity-50`) até os campos obrigatórios terem valor; formato
inválido só aparece no envio, pelo Zod.

## Logo

Metro não importa `.svg` como componente. O arquivo original fica em `src/shared/assets/logo.svg`
como fonte, e a versão consumível é `src/shared/assets/svgs/Logo.tsx` (`react-native-svg`), com o
`fill` vindo de `COLORS` (`gray[100]` e `lime[500]`, os mesmos hex do arquivo). O Biome ignora
`**/*.svg` para não exigir edição do asset de marca. Tamanho padrão: 24 de altura, medido na tela
de boas-vindas.

## Estilo

Estilo é `className`; `StyleSheet.create` não entra no projeto. `style` só para valor calculado em
runtime (inset de safe area, largura de progresso) e sombra como constante de módulo.

Classe precisa ser literal — o Tailwind escaneia o texto do arquivo:

```tsx
const cls = `text-${size}`;                                 // não gera nada
const cls = size === 'xl' ? 'text-body-xl' : 'text-body';   // certo
```

Por isso variantes guardam a classe completa, não o fragmento. Ordem do `className`: o Biome
ordena sozinho (`useSortedClasses`) — rode `yarn format`.

### `className` só funciona em componente registrado

O NativeWind converte `className` só nos componentes do React Native e no `SafeAreaView`.
Componente de biblioteca (`expo-image`, `GestureHandlerRootView`, `Animated.View`) ignora
`className` em silêncio. Registre com `cssInterop` num componente nosso em
`presentation/components/` e use sempre ele.

## Ícones

`lucide-react-native`, com `size` e `color` explícitos e `strokeWidth` entre 1.8 e 2, importado
**pelo subpath do ícone**: `import SaladIcon from 'lucide-react-native/icons/salad'`. O Metro não
faz tree-shaking de barrel — `import { SaladIcon } from 'lucide-react-native'` puxa os ~1.600
ícones e dobrou o bundle (1.805 → 3.637 módulos). Do barrel só entra `import type { LucideIcon }`. **Nunca emoji** no lugar de ícone, mesmo que o Figma use:
o Pedro pediu lucide. Ícone de opção fica em `black-700` sobre chip `h-12 w-12 rounded-xl
bg-gray-200`. Uma biblioteca de ícones só.

## Card de opção (escolha única)

Molde em `Onboarding/components/OptionCard`: `rounded-2xl border`, `border-gray-300 bg-white`
normal; selecionado `border-lime-700 bg-lime-700/10` (o verde-claro do Figma não é token — é o
lime-700 a 10% sobre branco) com o chip em `bg-white/60`. Grupo com `accessibilityRole='radiogroup'`,
card com `radio` e `accessibilityState.checked`.

## Acessibilidade

Todo elemento clicável leva `accessibilityRole`, `accessibilityLabel` quando o conteúdo visível
não descreve a ação (o voltar do header), `hitSlop` quando a área é menor que ~44px e feedback de
toque (`active:opacity-*`).

## Dark mode

Ausente de propósito: `userInterfaceStyle` é `light` no `app.json`. Sem `dark:` e sem
`useColorScheme`.
