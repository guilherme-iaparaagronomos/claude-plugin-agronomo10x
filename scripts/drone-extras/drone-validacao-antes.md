## O que esta skill decide

Nenhum número de drone sai sem passar por aqui. O método é livre; a medição é fixa: janelas sorteadas, referência marcada antes de ver o modelo, pareamento um a um com tolerância declarada, métricas por janela e no total, margem por bootstrap de janelas e o teste às cegas uma única vez. Com o módulo da ClaudIA QGIS (versão 1), tudo isso é `cd.avaliador.*` (`criar_janelas`, `recorte_referencia`, `registrar_referencia`, `parear`, `avaliar`, `comparar`, `validar_final`, `status`); sem o módulo, siga as regras abaixo com os trechos de `references/trechos.md`.

## O comando `/anotacao <alvo> [onde]`

**O que anotar** define a camada no GeoPackage, a geometria e a instrução:

| Alvo | Geometria | Camada | Instrução | Alimenta |
|---|---|---|---|---|
| `planta` / `arvore` | ponto no centro | `ref_plantas` | um ponto por planta com o centro dentro do quadro; `classe` = certa / duvida / copas_juntas | contagem, uniformidade, faltantes |
| `falha` | linha sobre a fileira | `ref_falhas` | do início ao fim do vão; vão na ponta da fileira não conta | falhas |
| `linha` | polilinha | `ref_linhas` | uma por fileira, de ponta a ponta do quadro | linhas |
| `copa` | polígono | `ref_copas` | contorno de cada copa; copas encostadas separadas | segmentação |
| `daninha` | polígono por mancha (ponto se isolada) | `ref_daninhas` | contorno da mancha; `classe` livre se o usuário quiser (ex.: folha larga / estreita) | daninhas e exemplos para o SAM 3 |
| `excluir` | polígono | `ref_excluir` | carreador, bordadura, área fora da conta | área útil |
| `outra` | ponto ou polígono, classe livre | `ref_outra` | o que o usuário definir | candidatas e futuros alvos |

Campos comuns: `janela_id`, `passada`, `classe`, `autor` (usuario / ia / externo), `as_cegas` (sim / não), `amostra` (sorteada / dirigida / camada), `marcado_em`, `obs`.

**Onde anotar** (a origem da amostra vai carimbada em cada feição):

| Opção | O que é | Vale para |
|---|---|---|
| `janelas` (padrão) | as janelas de validação já sorteadas (aleatórias, estratificadas por vigor, fora de carreadores e bordas, ajuste × teste); sem janelas, crie-as primeiro | o número do relatório |
| `aleatorio N` | sorteia N janelas novas com as mesmas regras | alvo novo ou margem larga demais |
| `aqui` | polígono que o usuário desenha ou seleciona | ensinar o alvo (exemplos), investigar um ponto, janela de AJUSTE — amostra DIRIGIDA, fora da validação às cegas; métrica calculada nela sai marcada "não representativa do talhão" |
| `camada <nome>` | dentro dos polígonos de uma camada existente (parcelas, talhões) | representativa só se os polígonos foram definidos antes de ver o resultado |

**Modo usuário (hoje)**: crie a camada no GeoPackage com símbolo visível (`set_layer_style`; rótulo da passada com `set_layer_labeling`), OCULTE a camada do resultado do modelo (`set_layer_visibility`), vá janela a janela (`set_canvas_extent` com margem), `start_editing`, dê a instrução curta, espere o "pronto", `commit_edits`, conte com `get_layer_features` filtrado pela janela, grave no `estado.json` e avance. Segunda passada opcional (recomendada em 20 % das janelas) com a primeira oculta → concordância pelo pareamento = o teto do que o modelo pode atingir. No fim: resumo por janela, avisos (janela com menos de 15 plantas, falha sem início ou fim, polígono aberto, anotação dirigida) e o próximo passo (`/validar-deteccao`).

**Modo IA** (quando você consegue VER o recorte: tool que devolve imagem na resposta, ou PNG lido da pasta no app desktop/Claude Code): o protocolo da seção de validação abaixo (recorte com até 10 objetos, ampliado, régua, margem escurecida, pontos e não números, sem pistas, duas passadas deslocadas, terceira se discordarem, usuário acima de 15 % de dúvidas). `autor = ia`.

**Modo importar**: referência vinda de outro software entra como `autor = externo`. Referência feita depois de ver o resultado do modelo é "assistida" e precisa ser declarada.

## O comando `/validar-deteccao <camada> [tolerância]`

Mede QUALQUER camada de resultado — a nossa ou a de outro software — contra a referência das janelas: pareamento um a um; precisão, recall, F1 e erro de contagem com a tolerância declarada (e também 0,5×, 0,75× e 1,0×); MAE, RMSE, rRMSE e R² por janela; falhas por sobreposição com 0,4 m nas pontas, por janela, por classe de comprimento e no total; linhas por cobertura, espaçamento e desvio lateral; IoU/Dice e erro de área para polígonos; intervalo de 95 % por bootstrap de janelas inteiras; ajuste e teste separados em blocos geográficos. Grava `validacao.status` no `estado.json`. Conferências obrigatórias: TP + FN = referência e TP + FP = detectado.
