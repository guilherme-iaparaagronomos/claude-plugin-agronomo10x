---
description: Leva para o QGIS do usuário, pela ClaudIA QGIS, o produto de satélite que acabou de ser gerado pela ClaudIA Sat (ou gera e leva) — NDVI, RGB, NDRE, composto ou diferença — já com estilo; com os talhões quando o conector os exportar
argument-hint: "[ndvi|rgb|ndre|composto|diferenca] [fazenda] [talhão] [período]"
---

Argumentos: $ARGUMENTS

1. `claudia-qgis` → `ping`. Sem resposta: oriente a abrir o QGIS, ativar o plugin ClaudIA QGIS e conectar com o token de `https://comunidade.agronomos.ia.br/solucoes/mcp/claudia-qgis`; pare até conectar.
2. Se a última resposta desta conversa já trouxe um link de GeoTIFF da ClaudIA Sat e ele tem menos de 1 hora, use esse link. Senão, gere o produto pedido: `imagem_satelite` (produto, `dias_janela` 30 ou o período), `composto_indice` (mediana) ou, para "diferença", o comando `/comparar` com "no QGIS".
3. Siga a skill `satelite-no-qgis`: download pelo próprio QGIS (`execute_code` curto, mostrado antes), `create_checkpoint` se o projeto já tem camadas, `add_raster_layer`, `set_raster_style` (índices em `RdYlGn` contínuo com os limites das estatísticas; RGB em `multiband_color`), `zoom_to_layer`.
4. **Talhões**: se o conector `claudia-sat` tiver a ferramenta `exportar_fazenda`, baixe o GeoJSON da fazenda do mesmo jeito, `add_vector_layer` (só contorno) e ofereça `zonal_statistics` da camada do índice por talhão (média, mínimo, máximo). Se a ferramenta não existir, diga que os polígonos dos talhões ainda não saem pelo conector e que o usuário pode carregar o próprio arquivo no projeto.
5. Responda em texto: fazenda, produto, data da cena e % livre de nuvem (ou período do composto), média do índice, nome da camada e o caminho salvo. Não renderize nem capture a tela para "mostrar": o usuário está vendo o QGIS.

Um produto por camada. Link vencido dá erro no download: gere de novo. Leitura do dado, não recomendação de manejo. Nada sobre a tecnologia por trás do processamento.
