---
description: Sorteia as janelas de validação da análise de drone (ajuste e teste separados, estratificadas por vigor, fora de bordas e carreadores) com o tamanho certo para a tarefa, grava no GeoPackage e estima o esforço de anotação
argument-hint: "[aula | completo] [tarefa: contagem | falhas | linhas | copas | daninhas] [n]"
---

Argumentos: $ARGUMENTS

Skill: `drone-validacao`. Com o módulo da ClaudIA QGIS: `cd.avaliador.criar_janelas(s, tarefa, n, lado_m)`; sem ele, o caminho abaixo num `execute_code` curto (mostre antes).

1. Sessão (`/cena-drone` se não houver): precisa da área útil (ou do polígono do talhão) e do espaçamento. `create_checkpoint`.
2. Tamanho por tarefa: contagem — janela quadrada com lado de 4–6 espaçamentos na linha e ~15–30 plantas; falhas — trechos de fileira de 20–25 m; linhas — janelas com 6 fileiras ou mais; copas/daninhas — ~20 m de lado.
3. Quantidade: **modo aula** = 4 de ajuste + 4 de teste (falhas: janelas de 10 m com ~7 fileiras; contagem: 5 janelas de 20 m) — diga que a margem fica larga; **modo completo** = 5–8 de ajuste e pelo menos 20 de teste (falhas: 20 trechos de 20–25 m e ~100 falhas de referência; contagem: ≥ 200 plantas; segmentação: ≥ 100 polígonos). Comece com 10 de teste e acrescente até a margem do F1 ficar em ±5 pontos.
4. Sorteio: aleatório e estratificado por vigor (ExG médio em blocos: baixo/médio/alto), ajuste e teste em blocos DIFERENTES, fora de carreadores e de uma faixa de borda; `random.seed` gravado. Regra de borda: só conta objeto com o centro dentro da janela.
5. Grave `janelas` no GPKG (`id`, `conjunto` = ajuste/teste, `estrato`, `lado_m`, `tarefa`, `semente`) e `add_vector_layer` só com contorno e rótulo do id. Registre no `estado.json`.
6. Responda: quantas janelas de cada conjunto, onde (ids e estratos), o esforço estimado de anotação (objetos por janela × janelas) e o próximo passo: `/anotacao <alvo>`.

Janelas sorteadas pelo sistema são a referência que vale no relatório; polígono escolhido pelo usuário é amostra dirigida (ver `/anotacao`). O usuário está olhando o QGIS — não capture a tela.
