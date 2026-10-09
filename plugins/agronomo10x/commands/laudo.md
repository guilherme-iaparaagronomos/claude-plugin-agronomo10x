---
description: Laudo em PDF (RGB, NDVI e NDRE) de uma fazenda ou talhão salvo na ClaudIA Sat
argument-hint: "<fazenda> [talhão] [período]"
---

Gere o laudo de satélite de uma fazenda salva na ClaudIA Sat. Argumentos: $ARGUMENTS (nome da fazenda e, se quiser, um talhão e um período).

1. Sem fazenda nos argumentos, chame `listar_fazendas` do conector `claudia-sat` e pergunte qual.
2. Chame `laudo_pdf` com `fazenda` (e `talhao`, `data_inicio`/`data_fim` quando pedidos; `nome_propriedade` com o nome da fazenda para o cabeçalho). Sem cena no % de nuvem padrão, mostre as candidatas e pergunte se aceita.
3. Responda com a data da cena, o % livre de nuvem, as médias de NDVI e NDRE e o link do PDF (vale 1 hora). Quando você tem acesso a pastas (app desktop ou Claude Code), baixe e salve em `agronomo10x/<fazenda>/<data>/laudo.pdf` e informe o caminho. O PDF não vira camada no QGIS.

Leitura do dado, não recomendação de manejo. Nada sobre a tecnologia por trás do processamento.
