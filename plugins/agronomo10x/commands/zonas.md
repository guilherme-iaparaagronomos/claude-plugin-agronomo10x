---
description: Zonas de vigor de uma fazenda salva, feitas no QGIS do usuário — composto de NDVI da ClaudIA Sat reclassificado em 3 ou 5 classes pela ClaudIA QGIS, manchas pequenas limpas, polígonos com área, estilo e exportação em shapefile/KML para o equipamento
argument-hint: "<fazenda> [talhão] [período — padrão: últimos 120 dias] [3|5 classes]"
---

Argumentos: $ARGUMENTS

Pré-condições: `claudia-qgis` → `ping` responde (senão oriente a conectar o plugin ClaudIA QGIS e pare); projeto em SRC projetado em metros (confira com `get_project_info`; se for geográfico, avise que as áreas sairão aproximadas ou sugira reprojetar).

1. Sem fazenda nos argumentos, chame `listar_fazendas` do conector `claudia-sat` e pergunte qual.
2. `claudia-sat` → `composto_indice` com `fazenda` (e `talhao`), `indice: "ndvi"`, `operacao: "mediana"`, `data_inicio`/`data_fim` (padrão: últimos 120 dias; aceite "safra"). Anote quantas cenas entraram.
3. `create_checkpoint`; leve o GeoTIFF para o projeto pelo caminho da skill `satelite-no-qgis` (download pelo próprio QGIS + `add_raster_layer`, nome "<Fazenda> NDVI mediana <período>").
4. Siga a skill `zonas-de-manejo-qgis`: limites por tercis (3 classes, padrão) ou quintis (5) com o `execute_code` curto da skill (mostre o código antes); `native:reclassifybytable` → `gdal:sieve` (0,5 ha em pixels) → `gdal:polygonize` → `native:multiparttosingleparts` → `area_ha` e nome da classe por `field_calculator` → `set_layer_style` categorizado → `zoom_to_layer` → `export_layer` em shapefile (KML se pedido) em `agronomo10x/<fazenda>/zonas_<período>.shp`.
5. Responda com a tabela zona · área em ha · % da fazenda, os limites usados, o nº de cenas do composto e os caminhos dos arquivos. Não capture a tela: o usuário está olhando o QGIS.
6. Ressalvas fixas: zonas de vigor por satélite de 10 m (manchas menores que ~1 ha são ruído); vigor histórico não é fertilidade; não é mapa de prescrição — sem produto, sem dose; ISOXML o QGIS não exporta (entregue o shapefile e diga isso).

Leitura do dado, não recomendação de manejo. Nada sobre a tecnologia por trás do processamento.
