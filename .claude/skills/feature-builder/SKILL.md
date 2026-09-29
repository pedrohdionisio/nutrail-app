---
name: feature-builder
description: Constrói uma feature do Nutrail App de ponta a ponta — spec, implementação, testes, verificação e revisão — orquestrando os subagents app-builder, test-writer e code-reviewer. Use para uma tela nova, um fluxo novo ou uma mudança num fluxo existente.
when_to_use: 'Pedidos como "cria a tela", "implementa a feature", "adiciona o fluxo", "liga o app no endpoint novo" ou "quero que o app faça...".'
argument-hint: "[o que a feature precisa fazer, e o link do Figma se houver]"
---

# Feature builder

Você orquestra; os subagents fazem o trabalho especialista. Eles começam sem esta conversa, então
toda delegação carrega o que eles precisam: a spec, os critérios de aceite, os arquivos envolvidos
e o link do Figma, se houver. Eles carregam o `CLAUDE.md` e as regras de `.claude/rules/`.

Pedido: $ARGUMENTS

## 0. Dimensione

Se a mudança é pequena e numa peça só (um texto, um campo a mais na tela, uma mensagem de erro, um
ajuste de layout), faça você mesmo seguindo o mesmo roteiro (spec, dúvidas, mudança, teste,
verificação), sem subagents. Subagents compensam quando a mudança atravessa `data/`, navegação e
tela.

## 1. Spec

Leia a feature existente mais parecida e o contrato na `../nutrail-api` (controllers, schemas,
erros e a seção 7.5 de `docs/ARCHITECTURE.md`). Se a rota que a feature precisa não existe na API,
pare e diga ao usuário: a API vem primeiro.

Depois escreva a spec na conversa:

- **Fluxo** — de onde o usuário chega, o que vê, o que faz, para onde vai. Telas novas são rotas;
  o que cobre parte da tela é bottom sheet.
- **Contrato** — cada endpoint consumido (método, caminho, body, resposta) e os `code`s que o
  usuário pode ver, com a mensagem de cada um em português e em inglês.
- **Dados** — módulo de `data/`, entidade, chaves de query, o que invalida o cache, polling se o
  resultado é assíncrono (análise por IA).
- **Estados** — carregando, vazio e erro de cada tela, e o que o Figma não cobre.
- **Critérios de aceite** — numerados, cada um observável na tela ou no body enviado à API. Eles
  guiam os testes.

## 2. Tire as dúvidas com o usuário

Com a spec escrita e antes de qualquer código, liste o que continua em aberto. Uma dúvida é real
quando:

- o pedido, o código, o design e a API não a resolvem;
- respostas diferentes levam a telas, fluxos, contrato ou testes diferentes.

Não é dúvida real quando uma convenção ou uma tela existente já responde. Decida essas você e
registre a decisão na spec.

Se sobrarem dúvidas reais, pergunte numa rodada só com AskUserQuestion, até quatro perguntas:

- cada uma concreta, com 2 a 4 opções e o custo de cada;
- sua recomendação primeiro, marcada "(Recomendado)";
- inclua do que uma boa resposta depende (de onde o usuário vem, o que acontece sem conexão, o que
  aparece enquanto a IA analisa), para a resposta trazer contexto e não só uma escolha.

Incorpore as respostas na spec e siga. Sem dúvidas reais, pule este passo em silêncio: não peça
confirmação da spec.

## 3. Implemente — `app-builder`

Delegue com a spec completa. Espere o relatório e leia: arquivos, contrato, navegação, estados e
decisões. Se ele parou com uma pergunta, responda (ou pergunte ao usuário) e continue com
SendMessage.

## 4. Teste — `test-writer`

Delegue com a spec, os critérios de aceite numerados e a lista de arquivos do passo 3. Ele escreve e
roda os testes e nunca edita `src/`.

## 5. Verifique

Rode você mesmo `yarn typecheck && yarn lint && yarn test`. Para cada falha, decida quem está
errado:

- código de produção → continue o `app-builder` com SendMessage, citando a asserção que falhou;
- o teste → continue o `test-writer` do mesmo jeito.

Repita até ficar verde. Não suba o Metro nem faça build nativo para verificar: se algo só dá para
confirmar no aparelho (câmera, gravação, teclado), diga isso no relatório.

## 6. Revise — `code-reviewer`

Delegue com a spec e a lista de arquivos alterados. Confira cada achado no código antes de agir.
Mande os confirmados para o agent dono do arquivo (SendMessage) e rode o passo 5 de novo. No máximo
duas rodadas de revisão; o que sobrar vai para o relatório.

## 7. Relatório

Em português, para o usuário:

- o que foi construído, tela a tela;
- endpoints consumidos e `code`s tratados;
- decisões tomadas onde o design ou a API não cobriam;
- o resultado da verificação, com as contagens;
- o que precisa ser conferido no aparelho;
- achados da revisão que não foram corrigidos, e por quê;
- que nada foi commitado.

Não faça commit sem o usuário pedir. Se a feature muda o que o app faz, avise que o `README.md` e o
README do `../nutrail` podem precisar de uma linha nova.
