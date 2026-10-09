---
type: llm
criteria: A resposta descreve o fluxo na ordem certa: primeiro a ClaudIA Geo (imagem_satelite com o nome da fazenda salva, produto ndvi, e menciona listar_fazendas ou o campo fazenda), depois a ClaudIA QGIS (ping para conferir a conexão, download do arquivo do link de 1 hora para a máquina do usuário, add_raster_layer com o caminho, set_raster_style singleband_pseudocolor). Não afirma que a imagem aparece na resposta do chat e não cita nenhuma tecnologia, engine ou provedor por trás do processamento (só "Sentinel-2" é permitido).
target: last_message
---
Confere que a skill de roteamento e a skill satelite-no-qgis foram aplicadas: Geo gera, QGIS baixa e estiliza, sem screenshot e sem citar tecnologia interna.
