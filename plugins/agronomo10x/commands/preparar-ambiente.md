---
description: Confere o que o QGIS do usuário tem para a análise de drone (plugin ClaudIA QGIS, bibliotecas do Python do QGIS, módulo de drone, SRC do projeto, pasta de trabalho) e diz o que dá para rodar e o que falta — sem instalar nada no Python do QGIS
argument-hint: ""
---

Skills: `drone-roteiro`, `drone-imagem`.

1. `ping` e `diagnose` no conector `claudia-qgis`: versão do QGIS e do plugin ClaudIA QGIS (jobs, checkpoints e export_session pedem o plugin 0.4.0 ou mais novo), provedores de Processamento (native, gdal, grass).
2. `execute_code` curto (mostre antes) que tenta importar e imprime a versão de: numpy, scipy, osgeo.gdal, sklearn, pandas, shapely, geopandas, matplotlib, PIL, skimage, cv2, torch — e testa `from claudia_qgis import drone`. Não instale nada: `pip install` no Python do QGIS é proibido (quebra o QGIS); o que faltar vai para um Python isolado (versão 1 do módulo) ou fica fora do caminho.
3. `get_project_info`: SRC do projeto; se for geográfico ou EPSG:3857, avise que as distâncias e áreas saem erradas e proponha UTM/SIRGAS 2000.
4. Responda com uma tabela: item · situação (ok / falta / versão) · consequência (ex.: "sem scikit-image e OpenCV: Otsu, máximos locais e watershed saem com numpy/scipy, como nas skills"; "com matplotlib e PIL: recortes de evidência em PNG na pasta de trabalho"; "sem o módulo de drone: caminho clássico, resultado reproduzível só pelo `funcoes_drone.py` da sessão").
5. Com o módulo presente: `cd.ambiente.status()` (CPU/GPU, SAM 2.1, SAM 3, pesos) e, se o usuário quiser a segmentação por SAM, a instalação do Python isolado sob demanda — só com o "sim" dele, dizendo tamanho e tempo estimados.

Nada de código que altere o QGIS ou o sistema sem confirmação. O usuário está olhando o QGIS.
