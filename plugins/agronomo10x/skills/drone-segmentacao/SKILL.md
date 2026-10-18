---
name: drone-segmentacao
description: "Segmentação de copas, daninhas e outras plantas em ortomosaico de drone: watershed a partir dos pontos, SAM por ponto com refinos, plugins que o usuário já tenha (Geo SAM, SamGeo, GeoOSAM) com a nossa validação, plantas fora do padrão da linha. Use para \"copas\", \"área de copa\", \"cobertura\", \"daninhas\", \"mato\", \"zonas de aplicação\", \"segmentar\"."
---

<!-- GERADO por scripts/gera-drone.mjs a partir do playbook analise-drone-qgis (skills-agro, versão cc3fc248) + scripts/drone-extras/. Não edite à mão: corrija a fonte e gere de novo. -->

# ClaudIA Drone — segmentação de copas e daninhas

## 4. Segmentação (só se for pedida)

**Caminho A: clássico, sem instalar nada (o mais rápido para aula)**
1. Máscara de copa a partir do mapa do alvo.
2. `scipy.ndimage.watershed_ift` com os pontos da contagem como sementes, sobre o mapa de copa invertido e restrito à máscara.
3. Polígonos com `gdal.Polygonize`.
4. Aplique os refinos do caminho B.

**Caminho B: SAM 2.1 a partir de pontos**
- **Ambiente.** Só num Python **separado** do QGIS (venv próprio com o SAM 2 oficial, Apache 2.0, ou o Ultralytics, AGPL). Chame por `subprocess` a partir do `execute_code`: grave recortes e pontos em arquivo, leia as máscaras de volta.
- **Recortes:**
    - 480 × 480 px (24 m, com 2 m de margem) e um ponto por planta;
    - tempo: 21–26 s por recorte em CPU de 2 núcleos;
    - talhão inteiro: avise o tempo e rode em segundo plano.
- **Refinos que funcionaram no pomar (F1 de 92,5%):**
    - centralizar o ponto na copa;
    - juntar duplicados (< 1,0 m ou IoU > 0,5);
    - aceitar máscaras de 1–9 m²;
    - dividir máscaras ≥ 7,5 m² com alongamento ≥ 1,6;
    - completar copas que ficaram sem ponto.
- **Nunca use o modo automático** ("segmentar tudo") com copas encostadas: deu 12 máscaras para 42 plantas, em 351 s.
- **SAM 3** só com GPU, usando exemplos (caixas positivas e negativas), não texto. Devolve no máximo 200 objetos por imagem: divida em tiles.

**Caminho C: plugins que o usuário já tenha** (GeoAI, Deepness, AI Segmentation da TerraLab). O resultado passa pela mesma validação.

**Outras plantas e daninhas**
1. Tire da máscara de vegetação o que tem forma de fileira (abertura morfológica; raio de 0,40 m na cana).
2. Fique com as manchas longe das linhas, mais verdes ou mais escuras.
3. Ordene as candidatas e confira uma a uma na imagem. Na cana, de 14 candidatas, 3 foram confirmadas.

**Filtrar "mato" só pela cor remove plantas verdadeiras:** piorou o resultado no pomar.

**Validação.** IoU (mediana e distribuição) e erro de área contra polígonos de referência. Critério inicial: IoU de pelo menos 0,75 e erro de área de até 10%.

## Caminho C com plugins que o usuário já tem

Antes de prometer SAM pelo nosso worker (versão 1), confira com `list_plugins` o que está instalado no QGIS do usuário:

- **Geo SAM** (repositório oficial, SAM 1/2/2.1/3; instala as dependências num diretório privado do plugin; decodifica em CPU): codificar a imagem antes, depois segmentar por ponto; exporte os polígonos para o GeoPackage da sessão.
- **SamGeo** (segment-geospatial; pontos, caixas, texto; CPU ou CUDA) e **GeoOSAM** (SAM 2.1 e 3): o mesmo uso por pontos.
- **AI Segmentation (TerraLab)** e outros: idem.

Oriente a segmentação por PONTOS (um por planta, vindos da contagem) — nunca o modo automático "segmentar tudo" com copas encostadas (12 máscaras para 42 plantas na sessão de referência). Seja qual for a origem, os polígonos passam pela MESMA validação (`/validar-deteccao` com a referência `copa` do `/anotacao`): IoU mediano, erro de área, copas juntas ou divididas. Faça `create_checkpoint` antes de rodar o plugin do usuário.

## Daninhas → zonas de aplicação (`/daninhas`)

Manchas confirmadas → área infestada em hectares e % da área útil, número e tamanho das manchas → zonas na grade do equipamento (largura da barra informada pelo usuário; mancha mínima ≥ 2× a seção; buffer declarado) → `export_layer` em shapefile ou KML com um campo numérico de classe. Sem produto, sem dose, sem ISOXML (o QGIS não gera; diga isso). Em campo, conferir as 3–5 maiores manchas antes de qualquer uso.

## Entregáveis

- Copas: número, área (média, mediana, p10–p90), diâmetro, cobertura em % da área útil, classes de tamanho, vigor por copa quando houver índice.
- Daninhas: área infestada (ha e %), manchas (número e tamanho), zonas de aplicação (shapefile/KML).
- Validação: IoU mediano ≥ 0,75 e erro de área ≤ 10 % como critério inicial, em pelo menos 100 polígonos de referência (modo completo).

---
Fonte do método: playbook `analise-drone-qgis` da comunidade agrônomo10X (skills-agro, MIT; versão cc3fc248). Sigilo, informação (não recomendação) e as regras dos conectores: skill `roteamento-agronomo10x`.
