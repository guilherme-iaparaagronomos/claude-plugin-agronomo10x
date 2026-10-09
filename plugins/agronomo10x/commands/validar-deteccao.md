---
description: Valida qualquer camada de resultado de drone (linhas, falhas, plantas, copas, daninhas — nossa ou de outro software) contra a referência anotada nas janelas, com pareamento, tolerância declarada, métricas por janela e no total, intervalo de 95 % e status de validação
argument-hint: "<camada do resultado> [tolerância em m] [ajuste | teste | final]"
---

Argumentos: $ARGUMENTS

Skill: `drone-validacao`. Com o módulo da ClaudIA QGIS: `cd.avaliador.avaliar`, `comparar`, `validar_final`; sem ele, o caminho abaixo com os trechos de `references/trechos.md` (pareamento húngaro, tipos Python).

1. Identifique a camada do resultado (`find_layer`/`get_layers`) e o alvo correspondente (`ref_plantas`, `ref_falhas`, `ref_linhas`, `ref_copas`, `ref_daninhas`). Sem referência: oriente o `/anotacao <alvo>`. Só janelas com referência marcada ANTES do resultado entram; anotação dirigida fica fora (ou entra marcada "não representativa").
2. Conjunto: `ajuste` (padrão enquanto se mexe em parâmetros), `teste` (as janelas nunca usadas) ou `final` = validação às cegas, UMA vez — se já houve, avise que repetir exige nova versão e fica registrado.
3. Métricas por tarefa, por janela e no total:
   - plantas/copas (pontos ou centróides): pareamento um a um dentro da tolerância (padrão: o menor entre metade do espaçamento na linha e o raio da copa; reporte também 0,5×, 0,75× e 1,0×), precisão, recall, F1, erro de contagem; MAE, RMSE, rRMSE e R² entre janelas;
   - falhas: falha da referência "encontrada" quando uma detectada a sobrepõe com 0,4 m de tolerância nas pontas (precisão no sentido inverso); % de falha detectado × referência por janela e no total; erro por classe de comprimento;
   - linhas: % de fileiras encontradas, cobertura, espaçamento, desvio lateral p50 e p90;
   - polígonos: F1 de detecção, IoU (mediana e distribuição), erro de área.
   Confira sempre TP + FN = referência e TP + FP = detectado; objeto só conta com o centro dentro da janela.
4. Margem: intervalo de 95 % por bootstrap de janelas inteiras (nunca de plantas). Comparar tentativas: validação cruzada deixando uma janela de fora por vez, no máximo 5 rodadas; depois `final`.
5. Grave em `estado.json`: conjunto, janelas, nº de objetos, tipo de referência (usuário/IA/externa; às cegas ou assistida), tolerância, métricas, intervalo e `validacao.status` (não validado · em ajuste · validado às cegas · reprovado). Imagem de acertos e erros em PNG na pasta `evidencias/` quando possível.
6. Responda com a tabela de métricas (total e por janela), a tolerância, a margem, o status e a leitura honesta: se o F1 ou a diferença em pontos passam do critério inicial (contagem F1 ≥ 0,90 e erro até ±5 %; falhas ±2 pontos e ≥ 80 % encontradas; linhas espaçamento ±3 %, cobertura ≥ 97 %, desvio p90 ≤ ⅕ do espaçamento; copas IoU ≥ 0,75 e área ≤ 10 %), ou o que falta. Erros para conferir: ofereça rever com marcas numeradas quando puder ver a imagem.

Métrica sem tolerância declarada não vale. Nada sobre a tecnologia por trás; informação, não recomendação.
