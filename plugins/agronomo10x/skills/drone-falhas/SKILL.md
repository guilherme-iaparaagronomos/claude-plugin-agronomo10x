---
name: drone-falhas
description: "Falhas de plantio em ortomosaico de drone pelo motor híbrido v3 (plantas como picos, solo exposto, limiar local), critério do usuário (Stolf 1986 e a régua ABNT como sugestões), candidatas gravadas e tabela por critério e por classe de comprimento. Use para \"falhas\", \"gaps\", \"vãos\", \"replantio\", \"% de falha\", em cana, grãos e perenes."
---

<!-- GERADO por scripts/gera-drone.mjs a partir do playbook analise-drone-qgis (skills-agro, versão b133424b) + scripts/drone-extras/. Não edite à mão: corrija a fonte e gere de novo. -->

# ClaudIA Drone — falhas de plantio

## 2. Falhas de plantio (motor híbrido v3)

Precisa das linhas. **Limiar fixo não transfere entre áreas.** Na 2ª área, a receita da 1ª achou só 47% das falhas. Use o limiar local.

1. **Limiar local de solo.** Divida a área em trechos de ~25 m e calcule o Otsu do ExG dos pixels válidos de cada trecho. Então:
    - `t2` = Otsu − 0,02;
    - `th` = máx(0,05, `t2`).
2. **Perfil ao longo de cada linha,** a cada 5 cm:
    - em cada ponto, pegue o **maior** ExG numa faixa de ±0,15 m na perpendicular (interpolação bilinear);
    - suavize com gaussiana de 0,1 m (σ de 2 amostras).
3. **Plantas** são os picos do perfil com altura ≥ `th` e a pelo menos 0,1 m um do outro (`scipy.signal.find_peaks`).
4. **Falha.** Para cada par de plantas vizinhas a **mais de 0,5 m**, a falha vai do primeiro ao último ponto com perfil < `t2` entre elas (solo exposto). **Vãos nas pontas das linhas não contam.**
5. **Grave todas as falhas candidatas,** sem filtro, com os campos:
    - `linha_id`, `ini_m`, `fim_m`;
    - `comp_solo_m` e `dist_plantas_m`;
    - `limiar_local`.

    Assim o critério do usuário se aplica depois, sem rodar de novo.
6. **% de falha** = soma das falhas no critério ÷ comprimento de linha analisado. Entregue uma tabela com qualquer, ≥ 0,3, ≥ 0,5 e ≥ 1,0 m, mais o critério do usuário.

**Resultado de referência (Promisso, 5 cm, 114 km de linha):**
- 31.045 falhas candidatas, 21,2% de falha;
- teste às cegas: 85% das falhas encontradas, precisão de 69%, −2,0 pp no %.

**Cuidados que vão no relatório:**
- erro por janela de até ±12 pp: o número vale para o talhão, não para um trecho de 10 m;
- precisão de 60–69%: parte dos "falsos positivos" são vãos curtos (mediana de 0,35 m) que a referência não marcou;
- voo tardio piora tudo: o ideal é 30–45 dias após o corte.

**Não use** (já testados e piores):
- **presença por pixel com limiar fixo:** subestimou 4–10 pp, porque a folha vizinha cobre o vão;
- **distância entre plantas pura:** 42% de precisão com touceiras encostadas;
- **afinar parâmetros sem mudar o método:** 168 combinações e o erro parou em −4 pp.

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

## Referências desta skill

- `references/trechos.md`

---
Fonte do método: playbook `analise-drone-qgis` da comunidade agrônomo10X (skills-agro, MIT; versão b133424b). Sigilo, informação (não recomendação) e as regras dos conectores: skill `roteamento-agronomo10x`.
