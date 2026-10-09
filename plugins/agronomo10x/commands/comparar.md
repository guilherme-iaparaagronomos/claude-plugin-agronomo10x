---
description: Compara dois períodos ou duas safras de uma fazenda salva — mediana do índice da ClaudIA Sat em cada período, talhão a talhão, com a chuva dos dois períodos da ClaudIA Clima; opcionalmente o raster de diferença no QGIS
argument-hint: "<fazenda> <período A> x <período B> [ndvi|ndre] [no QGIS]"
---

Argumentos: $ARGUMENTS

Conector de clima: `claudia-clima`. Se ele não aparecer na instalação, peça para o usuário atualizar o plugin (0.3.1 ou mais novo) ou conectar pela aba Conectar em `https://comunidade.agronomos.ia.br/solucoes/mcp/clima` — as ferramentas de clima não estão mais no conector de satélite.

1. Sem fazenda nos argumentos, chame `listar_fazendas` do conector `claudia-sat` e pergunte qual. Traduza os dois períodos em datas e DIGA a tradução ("safra 2025" = 01/09/2024 a 31/08/2025; "setembro × outubro" = os meses inteiros; "mês passado × este mês" = idem).
2. `claudia-sat` → `composto_indice` duas vezes, com `fazenda`, `indice` (`ndvi` por padrão), `operacao: "mediana"` e as datas de A e de B. Depois `curva_indice` nos dois períodos (`todos_talhoes: true`) e calcule a média dos pontos de cada talhão em cada período.
3. `claudia-clima` → `clima_historico` para A e para B (`comparar_media: true`).
4. Responda com: a média da fazenda em A e em B e a diferença; a tabela talhão · média A · média B · Δ · Δ %, ordenada pela diferença; a chuva de A e de B (acumulado e % contra a normal). Nunca "a safra foi melhor": é comparação de índice, não de produtividade.
5. **"no QGIS"** (ou ClaudIA QGIS conectada e o usuário quer ver): leve as duas imagens pelo caminho da skill `satelite-no-qgis` (nomes "<Fazenda> NDVI mediana <A>" e "… <B>"), faça `create_checkpoint`, e gere a diferença com `raster_calculator` (`expression` = `"<nome B>@1" - "<nome A>@1"`, `reference_layer` = a camada B, `output_path` em `agronomo10x/<fazenda>/diferenca_<A>_<B>.tif`); `set_raster_style` `singleband_pseudocolor` com rampa divergente (`RdBu`) e `min_value`/`max_value` simétricos (ex.: −0,3 a 0,3); `zoom_to_layer`. O usuário está olhando o QGIS: não capture a tela.
6. Ressalvas: cenas com nuvem diferentes nos dois períodos (a Sat diz quantas cenas entraram em cada composto), fenologia diferente entre safras, pixel de 10 m.

Leitura do dado, não recomendação de manejo. Só números que as ferramentas devolveram. Nada sobre a tecnologia por trás do processamento.
