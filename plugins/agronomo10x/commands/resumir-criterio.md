---
description: Recalcula as tabelas de uma análise de drone já feita com outro critério (comprimento mínimo de falha, classes, limites de uniformidade, classes de copa) a partir das candidatas gravadas, sem rodar de novo, lado a lado com o critério anterior
argument-hint: "<critério novo: ex. falhas ≥ 0,8 m | classes 0,5/1/2 m | copas < 3 m²>"
---

Argumentos: $ARGUMENTS

Skills: `drone-falhas` (critérios), `drone-contagem`, `drone-relatorio`. Com o módulo da ClaudIA QGIS: `cd.relatorio.resumir(s, resultado, criterio)`; sem ele, o caminho abaixo.

1. Leia o `estado.json` da sessão: qual análise existe (falhas, contagem, copas), o critério usado e a origem dele. Sem candidatas gravadas (`falhas_candidatas`, `plantas`, `copas`), diga que o critério novo exige rodar a análise.
2. Aplique o critério novo sobre a camada completa, num `execute_code` curto: falhas = filtro por `comp_solo_m` (ou `dist_plantas_m`, se o critério for distância entre plantas) e novas classes; uniformidade = novos limites de falho/duplo; copas = novas classes de tamanho.
3. Monte a tabela lado a lado: critério anterior × critério novo (nº, %, metros por hectare, classe na escala, por talhão). Não mexa nas camadas originais; grave a camada filtrada nova (`falhas_<criterio>`) se o usuário quiser vê-la no QGIS.
4. A validação não muda de origem: se o resultado estava validado em um critério, diga que as métricas valem para o motor (as candidatas), e que a tabela nova herda o mesmo status e a mesma margem.
5. Registre o critério novo e a origem ("usuário") no `estado.json` e ofereça o `/relatorio-drone` ou o `/relatorio-1pagina` com ele.

Informação, não recomendação: o critério é agronômico e a decisão é do responsável técnico.
