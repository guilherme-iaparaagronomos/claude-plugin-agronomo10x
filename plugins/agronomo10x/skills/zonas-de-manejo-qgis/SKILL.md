---
name: zonas-de-manejo-qgis
description: Método para transformar o composto de NDVI da ClaudIA Sat em zonas de vigor dentro do QGIS do usuário pela ClaudIA QGIS (classes por tercis ou quintis, limpeza de manchas pequenas, polígonos, área por zona, estilo e exportação para o equipamento), mais a estatística zonal por talhão. Use quando o usuário pedir zonas de manejo, zonas de vigor, mapa para o equipamento ou taxa variável, "divide o talhão por vigor", ou estatística do índice por talhão no QGIS.
---

# Zonas de vigor no QGIS (Sat → ClaudIA QGIS)

O que sai daqui é um mapa de VIGOR HISTÓRICO pelo satélite, em classes. Não é mapa de prescrição: sem produto, sem dose; a decisão agronômica é do responsável técnico.

## 1. Entrada

- **Composto de período** da ClaudIA Sat: `composto_indice` com `indice: "ndvi"`, `operacao: "mediana"`, `data_inicio`/`data_fim` (a safra ou os últimos 120 dias) e `fazenda` (ou `talhao`). A mediana tira cena com nuvem e sombra; cena única não serve para zonas.
- QGIS conectado (`ping`), projeto em SRC projetado em metros (UTM/SIRGAS 2000) para as áreas saírem certas; `create_checkpoint` antes de começar.
- O GeoTIFF entra no QGIS pelo caminho da skill `satelite-no-qgis` (o próprio QGIS baixa o link com `execute_code` curto) e `add_raster_layer`.

## 2. Limites das classes

Três classes por tercis (padrão) ou cinco por quintis, calculados nos pixels válidos do próprio raster:

```python
# execute_code — mostre antes de rodar; leva poucos segundos
from osgeo import gdal
import numpy as np
from qgis.core import QgsProject
camada = QgsProject.instance().mapLayer("LAYER_ID")
ds = gdal.Open(camada.source()); b = ds.GetRasterBand(1)
a = b.ReadAsArray().astype("float64"); nd = b.GetNoDataValue()
v = a[np.isfinite(a) & ((a != nd) if nd is not None else True) & (a > -1) & (a < 1)]
print("tercis", [float(x) for x in np.quantile(v, [1/3, 2/3])], "quintis", [float(x) for x in np.quantile(v, [0.2, 0.4, 0.6, 0.8])], "n", int(v.size))
```

Alternativa sem código: `native:rasterlayerstatistics` e classes em média ± 0,5 desvio-padrão (baixo / médio / alto).

## 3. Passos no QGIS

1. **Reclassificar**: `execute_processing` com `native:reclassifybytable` — `INPUT_RASTER`, `RASTER_BAND: 1`, `TABLE` como lista plana `[min, max, classe, …]` (ex.: `[-1, t1, 1, t1, t2, 2, t2, 1, 3]`), `RANGE_BOUNDARIES: 0` (min < valor ≤ max), `NODATA_FOR_MISSING: true`, `DATA_TYPE: 5` (Int32), `OUTPUT` num caminho na pasta da fazenda.
2. **Limpar manchas pequenas**: `gdal:sieve` — `THRESHOLD` em pixels (0,5 ha ÷ área do pixel; pixel de 10 m = 50), `EIGHT_CONNECTEDNESS: false`.
3. **Vetorizar**: `gdal:polygonize` — `BAND: 1`, `FIELD: "zona"`; depois `native:multiparttosingleparts`.
4. **Área por polígono**: `add_field` `area_ha` (double) e `field_calculator` com `$area / 10000`; nome da classe com `field_calculator` (`CASE WHEN "zona" = 1 THEN 'Baixo' WHEN "zona" = 2 THEN 'Médio' ELSE 'Alto' END`).
5. **Estilo**: `set_layer_style` categorizado por `zona` (3 ou 5 cores em sequência, do seco ao verde); `zoom_to_layer`.
6. **Exportar**: `export_layer` em shapefile (`.shp`) para o software do equipamento; KML se pedido. ISOXML o QGIS não exporta nativamente — diga isso e entregue o shapefile.
7. **Resposta**: tabela zona · área em ha · % da fazenda; caminhos dos arquivos; o período do composto; as ressalvas abaixo.

Ids conferidos no QGIS 3.40: `native:reclassifybytable`, `gdal:sieve`, `gdal:polygonize`, `native:multiparttosingleparts`, `native:rasterlayerstatistics`, `native:zonalstatisticsfb`, `native:dissolve`.

## 4. Estatística por talhão

Com os polígonos dos talhões no projeto: `zonal_statistics` (`polygon_layer`, `raster_layer`, `band: 1`, `prefix: "ndvi_"`) devolve média, mínimo, máximo e desvio por talhão; ordene e descreva pela skill `leitura-satelite`. Se o conector da Sat tiver a ferramenta `exportar_fazenda`, os polígonos vêm dela; senão, os talhões precisam estar no projeto do usuário (o site da comunidade não exporta o perímetro ainda).

## 5. Ressalvas que vão na resposta

- Satélite de 10 m: manchas menores que ~1 ha são ruído mesmo depois do sieve; zonas finas demais não valem para máquina.
- Vigor histórico ≠ fertilidade: a zona diz onde o dossel foi mais fraco no período, não por quê. Amostragem de solo e conferência em campo são do responsável técnico.
- Período curto ou com poucas cenas limpas dá zonas instáveis: diga quantas cenas entraram no composto (a Sat informa).
- Sigilo: imagens do Sentinel-2 processadas pela comunidade agrônomo10X; nada sobre a tecnologia por trás.
