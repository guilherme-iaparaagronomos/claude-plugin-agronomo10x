---
description: Retoma uma análise de drone numa conversa nova — lê o estado.json e o GeoPackage da pasta analise_drone/, lista o que já existe (linhas, candidatas, janelas, referências, validações) e diz o próximo passo
argument-hint: "[pasta analise_drone/ ou caminho do ortomosaico]"
---

Argumentos: $ARGUMENTS

Skill: `drone-roteiro`. Com o módulo da ClaudIA QGIS: `cd.sessao.retomar(sessao_id)` e `cd.avaliador.status(s)`; sem ele, o caminho abaixo.

1. `ping` no conector `claudia-qgis`. Ache a pasta: pelo argumento, pela pasta `analise_drone/` ao lado do ortomosaico aberto (`get_layers` + `get_raster_info`), ou pergunte o caminho (nunca invente caminho).
2. `execute_code` curto (mostre antes): lê `estado.json`, lista as camadas do `resultados.gpkg` com `featureCount()`, confere se `funcoes_drone.py` existe e o importa com `sys.path.insert` + `importlib.reload`.
3. Responda com o inventário: imagem (pixel, SRC, arquétipo, espaçamentos), análises feitas (linhas, falhas com o critério e a origem, plantas, copas, daninhas) com data, janelas (ajuste/teste), referências por alvo (quantas, autor, às cegas ou assistida, passadas), validações (status, métricas, tolerância, margem), relatórios já gerados.
4. Carregue no projeto as camadas que não estiverem (`add_vector_layer` do GPKG), sem renderizar nem capturar.
5. Diga o próximo passo pela ordem do roteiro: perfil → linhas → janelas → anotação → análise → validação → relatório; se algo está "não validado", é por aí que se continua.

Nada do que está em disco é refeito sem o usuário pedir. O usuário está olhando o QGIS.
