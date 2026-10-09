---
description: Perfil do ortomosaico de drone aberto no QGIS (pixel, SRC, bandas, cobertura, orientação e espaçamento das linhas, arquétipo de plantio) e a adequação à tarefa pedida — "dá para contar/medir com esta imagem?" — sem bloquear; abre a sessão de trabalho
argument-hint: "[tarefa: linhas | falhas | contagem | copas | daninhas] [cultura]"
---

Argumentos: $ARGUMENTS

Skills: `drone-roteiro` (preparação e regras), `drone-imagem` (faixas e adequação). Se o módulo de drone da ClaudIA QGIS existir (`from claudia_qgis import drone as cd`), use `cd.sessao.abrir`, `cd.cena.analisar` e `cd.cena.adequacao`; senão, o caminho abaixo.

1. `ping` no conector `claudia-qgis`; sem resposta, oriente a conectar o plugin ClaudIA QGIS e pare. `get_project_info` + `get_layers`: ache o ortomosaico (raster de poucos centímetros por pixel) e o polígono da área, se houver. Mais de um raster: pergunte qual.
2. `get_raster_info` no ortomosaico: pixel, SRC, bandas e extensão. SRC geográfico ou EPSG:3857 → avise (distâncias infladas) e proponha reprojetar o projeto para UTM/SIRGAS 2000. Banda 4 = alfa (pixels válidos). Pixel de exatamente 5,0 cm → pergunte pelo `odm_report/stats.json` (`average_gsd`).
3. Perfil em 3–5 blocos de 20 m, num `execute_code` curto (mostre antes): cobertura vegetal (ExG acima do Otsu), orientação e espaçamento das linhas por FFT, periodicidade ao longo da linha (espaçamento entre plantas), contraste planta–solo, dossel aberto ou fechado. Proponha o arquétipo (linhas contínuas · plantas individuais em linha · perene com copa em linha · sem linha) e peça confirmação.
4. Adequação à tarefa pedida, pela tabela da skill `drone-imagem`: dentro ou fora da faixa conhecida, o motivo (pixel, dossel, borrão, sombra, costuras) e a recomendação de voo para a próxima vez. Nunca bloqueie: "fora da faixa; a expectativa é X; podemos rodar e medir nas janelas".
5. Numa mensagem só, pergunte o que falta: polígono da área útil (sem carreadores e bordaduras), espaçamento nominal entre linhas e entre plantas, cultura (opcional) e, para falhas, o critério.
6. Crie a pasta `analise_drone/` ao lado do ortomosaico com `resultados.gpkg`, `funcoes_drone.py` e `estado.json` (pixel, SRC, arquétipo, espaçamentos, tarefa, data) e diga onde ficou.

Responda com o perfil em uma tabela curta, o arquétipo proposto, a adequação e as perguntas. Nenhum número de análise ainda: isto é o diagnóstico. O usuário está olhando o QGIS — não capture a tela.
