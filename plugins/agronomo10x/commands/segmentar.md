---
description: Segmentação de copas no ortomosaico de drone aberto no QGIS a partir dos pontos das plantas — watershed (sem instalar nada), SAM por ponto quando houver (plugin do usuário como Geo SAM/SamGeo/GeoOSAM, ou o módulo da ClaudIA QGIS) — com área, diâmetro, cobertura e a nossa validação
argument-hint: "[copas | pontos <camada>] [watershed | sam] [talhão]"
---

Argumentos: $ARGUMENTS

Skills: `drone-segmentacao`, `drone-validacao`. Com o módulo da ClaudIA QGIS: `cd.receitas.copas_sam` (SAM 2.1 no worker, refinos); sem ele, os caminhos A e C abaixo.

1. Precisa dos pontos das plantas: sem a camada `plantas`, rode o `/contar-plantas` antes (ou use a camada de pontos indicada). `create_checkpoint`.
2. **Caminho A — watershed, sem instalar nada**: máscara de copa a partir do mapa do alvo → `scipy.ndimage.watershed_ift` com os pontos como sementes, sobre o mapa invertido e restrito à máscara → `gdal.Polygonize` → refinos (juntar duplicados a < 1,0 m ou IoU > 0,5; aceitar 1–9 m²; dividir máscaras ≥ 7,5 m² com alongamento ≥ 1,6; completar copas sem ponto). Lotes de ~40 s com parcial gravado.
3. **Caminho C — plugin que o usuário já tem**: `list_plugins`; com Geo SAM, SamGeo ou GeoOSAM instalado, oriente a segmentação POR PONTOS (nunca o modo automático com copas encostadas), em recortes de ~24 m, e importe os polígonos para o GeoPackage da sessão. Diga o tempo esperado em CPU (dezenas de segundos por recorte).
4. Grave `copas` (polígonos com `planta_id`, `area_m2`, `diametro_m`) e `add_vector_layer` só com contorno. Números: nº de copas, área (média, mediana, p10–p90), diâmetro, cobertura em % da área útil, classes de tamanho; vigor por copa se houver índice no projeto (`zonal_statistics`).
5. Validação: com referência `copa` nas janelas (`/anotacao copas`), `/validar-deteccao` → F1 de detecção, IoU mediano e distribuição, erro de área (critério inicial: IoU ≥ 0,75 e área ≤ 10 %). Sem janelas, "não validado".
6. Responda com os números, o caminho usado, o status de validação, as ressalvas (copas encostadas se fundem por cor; altura ou SAM ajudam; "filtrar mato só por cor remove plantas verdadeiras") e os caminhos dos arquivos.

Leitura do dado, não recomendação. O usuário está olhando o QGIS — não capture a tela.
