---
description: Uniformidade de estande (grãos) no ortomosaico de drone aberto no QGIS — espaçamentos entre plantas na fileira, coeficiente de variação, % aceitável, % falho (acima de 1,5× o esperado) e % duplo (abaixo de 0,5×), pela régua ABNT de plantabilidade, com os limites declarados
argument-hint: "[espaçamento esperado entre plantas em m] [limites: falho 1,5× | duplo 0,5×] [talhão]"
---

Argumentos: $ARGUMENTS

Skill: `drone-contagem` (uniformidade). Com o módulo da ClaudIA QGIS: `cd.receitas.uniformidade`; sem ele, o caminho abaixo. Esta medição é a de versão 1 do plano; na versão 0 rode e reporte como "método ainda sem caso validado".

1. Precisa das linhas e das plantas (`/linhas-plantio`, `/contar-plantas`). O espaçamento esperado vem do usuário; sem ele, use a periodicidade medida na fileira pelo `/cena-drone` e diga que é medida, não nominal.
2. Para cada linha, ordene as plantas ao longo dela e calcule os espaçamentos entre vizinhas (ignore as pontas). Classes pela régua ABNT: aceitável entre 0,5× e 1,5× o esperado; **falho** acima de 1,5×; **duplo** abaixo de 0,5× — ou os limites que o usuário informar (escreva-os no relatório).
3. Números por talhão e por linha: coeficiente de variação, % aceitável, % falho, % duplo, plantas por metro; grave `espacamentos` (segmentos com `comp_m` e `classe`) e `uniformidade_por_linha` no GeoPackage; `add_vector_layer` com estilo categorizado.
4. Cuidado que vai na resposta: duas plantas lidas como uma inflam os falhos e escondem os duplos — o status de validação da contagem (tolerância, F1) é o teto desta medição. Validação própria: com referência `planta` nas janelas, diferença de CV e de % falho/duplo até 5 pontos.
5. Responda: tabela por talhão, limites usados e origem, status de validação, ressalvas; classe de desempenho só com os limites escritos (variam entre fornecedores).

Informação, não recomendação: replantio e manejo são do responsável técnico. O usuário está olhando o QGIS — não capture a tela.
