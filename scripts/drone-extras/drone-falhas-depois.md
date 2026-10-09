## Critérios: de onde vêm e como registrar

O critério de falha é do usuário. Sem critério, ofereça as referências abaixo como SUGESTÃO, registre a origem no `estado.json` e no relatório ("usuário" / "sugestão Stolf 1986, aceita") e não recuse rodar.

- **Cana**: Stolf (1986) — falha = vão maior que 0,50 m entre colmos vizinhos, medido ao nível do solo (ABNT 156:000.00-005); índice de falhas abaixo de 10 % costuma ser lido como brotação excelente; usinas citam acima de 20 % como gatilho para avaliar replantio e ~3 % de perda a cada 10 % de falha — tudo referência antiga ou prática de usina, não norma.
- **Grãos (plantabilidade, ABNT)**: espaçamento aceitável entre 0,5× e 1,5× o de referência; **falho** acima de 1,5×; **duplo** abaixo de 0,5×. Por drone os limiares práticos são maiores (milho: vãos acima de ~45 cm; soja: relativo à mediana local).
- **Perenes**: posição esperada pelo espaçamento (skill `drone-contagem`, faltantes).

## Classes de comprimento e a classe "suspeita"

Entregue sempre a tabela por comprimento mínimo (qualquer, ≥ 0,3, ≥ 0,5, ≥ 1,0 m e o critério do usuário) e pelas classes que o mercado usa: 0,5–1 / 1–1,5 / 1,5–2 / 2–3,5 / acima de 3,5 m. Marque a classe 0,5–1,0 m como **suspeita — conferir em campo**: na Promisso a precisão nessa faixa ficou em 60–69 % e a literatura só considera confiáveis, em RGB comum, os vãos acima de 1,5 m. O `/resumir-criterio` recalcula qualquer tabela a partir das candidatas gravadas, sem rodar de novo.

## Entregáveis

- Números por talhão: % de falha no critério do usuário (com o critério escrito), % nos outros comprimentos mínimos e nas classes, classe na escala escolhida, metros de falha por hectare, estimativa de mudas para replantio (informação, não recomendação), erro por janela junto do total.
- Camadas: `falhas_candidatas` (todas, com `comp_solo_m` e `dist_plantas_m`), `falhas_<criterio>`, grade hexagonal de % e classe (`native:creategrid` tipo hexágono + `zonal_statistics`), prioridade por linha.
