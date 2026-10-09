---
description: NDVI (ou RGB/NDRE) da cena mais recente de uma fazenda salva na ClaudIA Geo, com a opção de abrir no QGIS
---

Gere a imagem de satélite de uma fazenda salva na ClaudIA Geo. Argumentos: $ARGUMENTS (nome da fazenda e, se quiser, o produto "rgb" ou "ndre", um talhão e um período).

1. Sem fazenda nos argumentos, chame `listar_fazendas` do conector `claudia-geo` e pergunte qual.
2. Chame `imagem_satelite` com `fazenda`, `produtos` (padrão `["ndvi"]`) e o período pedido (padrão: últimos 30 dias). Sem cena no % de nuvem padrão, mostre as candidatas e pergunte se aceita.
3. Responda com a data da cena, o % livre de nuvem, a média do índice e o link de 1 hora. Siga a skill `roteamento-agronomo10x` para a entrega: link no chat; arquivo salvo na pasta `agronomo10x/<fazenda>/<data>/` quando você tem acesso a pastas.
4. Se o usuário pediu "no QGIS", ou a ClaudIA QGIS está conectada e ele quer ver no projeto, siga a skill `satelite-no-qgis`.

Leitura do dado, não recomendação de manejo. Nada sobre a tecnologia por trás do processamento.
