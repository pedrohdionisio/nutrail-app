---
name: bug-fixer
description: Corrige um bug do Nutrail App com teste primeiro — localiza a causa, reproduz com um teste que falha pelo test-writer, corrige (direto ou pelo app-builder), verifica e revisa com o code-reviewer. Use quando algo no app se comporta errado.
when_to_use: 'Relatos como "tem um bug", "está quebrando", "a tela não atualiza", "mostra errado" ou "não funciona".'
argument-hint: "[o comportamento errado, e como provocá-lo]"
---

# Bug fixer

Um bug está corrigido quando um teste que falhava por causa dele passa, e nada mais quebrou.

Bug: $ARGUMENTS

## 1. Localize a causa

Leia o caminho do bug: screen → controller → useCase → service → a rota na `../nutrail-api`, e as
regras dessas camadas. Suspeitos comuns: data derivada de UTC, cache não invalidado, polling que não
para, `code` sem mensagem, formulário mais frouxo que o schema da API, interceptor de 401.

Diga a causa raiz em uma ou duas frases, com `arquivo:linha`. Se a evidência aponta para mais de uma
causa, diga em qual você acredita e por quê antes de seguir. Se a causa está na API, pare e diga ao
usuário: a correção é lá (`/bug-fixer` da `nutrail-api`), não um contorno no app. Se o "bug" é um
comportamento decidido de propósito (`CLAUDE.md`, `.claude/rules/`), pare e avise.

## 2. Reproduza — `test-writer`

Delegue com o comportamento errado, o esperado e a causa encontrada. Ele escreve o menor teste que
falha, roda e confirma que falha pelo motivo do bug. Leia a falha você mesmo: erro de setup não é
reprodução. Se o bug só existe no aparelho (câmera, gravação, gesto), diga isso e combine com o
usuário como verificar.

## 3. Corrija

- Corrija na camada dona da regra (veja `.claude/rules/`), com a menor mudança que faz o teste
  passar. Sem refatoração no caminho.
- Poucas linhas numa peça: corrija você mesmo. Várias camadas: delegue ao `app-builder` com a causa,
  o teste que falha e o comportamento esperado.

## 4. Verifique

`yarn typecheck && yarn lint && yarn test`. O teste novo passa, e todo o resto também. Não suba o
Metro nem faça build nativo.

## 5. Revise — `code-reviewer`

Delegue com a causa, o teste e os arquivos alterados. Aplique os achados confirmados e verifique de
novo.

## 6. Relatório

Em português: a causa raiz com `arquivo:linha`, a correção, o teste que a prova, o resultado da
verificação, o que precisa ser conferido no aparelho, e que nada foi commitado.
