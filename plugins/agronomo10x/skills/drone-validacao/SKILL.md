---
name: drone-validacao
description: "Janelas de validação, anotação de referência (pelo usuário no QGIS ou pela IA às cegas), pareamento e métricas com intervalo de confiança para qualquer resultado de drone (linhas, falhas, contagem, copas, daninhas), inclusive de outro software. Use ao criar janelas, anotar, validar, comparar tentativas, conferir erros, ou quando um número de drone estiver prestes a ser reportado sem status de validação."
---

<!-- GERADO por scripts/gera-drone.mjs a partir do playbook analise-drone-qgis (skills-agro, versão cc3fc248) + scripts/drone-extras/. Não edite à mão: corrija a fonte e gere de novo. -->

# ClaudIA Drone — validação e anotação

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

## 5. Validação (vale para todos os desafios)

**Janelas**
- **Separe ajuste e teste.** As janelas de ajuste servem para mexer em parâmetros; as de teste só são avaliadas no fim, uma vez. Validar perto do ajuste engana: deu 99% no miolo da janela e 86% no anel.
- **Modo completo:**
    - pelo menos 20 janelas de teste, aleatórias, estratificadas por vigor e fora de carreadores e bordas;
    - contagem: lado de 4–6 espaçamentos e ~15–30 plantas por janela, com pelo menos 200 plantas no total;
    - falhas: 20 trechos de 20–25 m e 100 falhas de referência.
- **Modo aula:**
    - 4 janelas de ajuste + 4 de teste (falhas: janelas de 10 m com ~7 fileiras);
    - ou 5 janelas de 20 m (contagem);
    - diga que a margem de erro fica larga.
- **Borda da janela:** só conta objeto com centro dentro dela.

**Referência (marcar ANTES de rodar o modelo naquela janela)**
- **Rota 1, o usuário marca no QGIS.** É a melhor para aula. Crie camadas vazias no GPKG para ele editar:
    - `ref_plantas` (pontos);
    - `ref_falhas` (linhas sobre a fileira, do início ao fim do vão);
    - `ref_copas` (polígonos).
- **Rota 2, você olha os recortes.** Só se você realmente consegue ver imagens: um arquivo lido do computador do usuário, uma imagem anexada ou uma ferramenta que devolve a imagem na resposta. `render_map` e as capturas da ClaudIA QGIS devolvem um link de 1 hora que você **não** consegue abrir. Protocolo:
    - recorte com até 10 plantas, ou faixa de fileira desenrolada, ampliado (lado maior de 1.000–1.500 px), com régua de 1 m e margem escurecida;
    - responda com **pontos**, da esquerda para a direita, cada um "certa", "dúvida" ou "copas juntas". O código conta;
    - **sem pistas:** não use o espaçamento nem a contagem esperada para decidir, porque a IA tende a ver o que espera;
    - **duas passadas** com o recorte deslocado em meia unidade. Discordando, uma terceira; persistindo, chame o usuário;
    - para conferir erros do modelo, use **marcas numeradas** (até 25 por imagem), cada uma "acerto", "erro" ou "dúvida".
- **Referência feita vendo o resultado do modelo** é "assistida" e precisa ser declarada.

**Métricas**
- **Contagem:**
    - pareamento um a um com tolerância (`linear_sum_assignment`);
    - precisão, recall, F1 e erro de contagem;
    - confira sempre: TP + FN = referência e TP + FP = detectado.
- **Falhas:**
    - uma falha da referência conta como **encontrada** se uma falha detectada a sobrepõe, com 0,4 m de tolerância nas pontas; a precisão usa a mesma regra no sentido inverso;
    - % de falha detectado × referência, **por janela e no total**, porque erros de sinal oposto se compensam na média.
- **Linhas:** % de fileiras, cobertura, desvio lateral (p50 e p90) e espaçamento.
- **Margem de erro:** bootstrap sorteando **janelas inteiras**, não plantas.
- **Comparar tentativas:** validação cruzada, deixando uma janela de fora por vez, nas janelas de ajuste. No máximo 5 rodadas. Depois, avaliação final nas de teste.

## Referências desta skill

- `references/trechos.md`

---
Fonte do método: playbook `analise-drone-qgis` da comunidade agrônomo10X (skills-agro, MIT; versão cc3fc248). Sigilo, informação (não recomendação) e as regras dos conectores: skill `roteamento-agronomo10x`.
