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
