---
description: Restituição das linhas de plantio no ortomosaico de drone aberto no QGIS (FFT por bloco, cristas, união dos segmentos), gravada no GeoPackage da sessão, com as métricas nas janelas quando existirem
argument-hint: "[espaçamento nominal entre linhas em m] [blocos de 20 m | rápido]"
---

Argumentos: $ARGUMENTS

Skills: `drone-linhas` (o caminho), `drone-roteiro` (sessão e regras). Com o módulo da ClaudIA QGIS: `cd.receitas.linhas_fft(s, ...)`; sem ele, o caminho clássico.

1. Sessão: se não houver `analise_drone/estado.json`, rode primeiro o `/cena-drone` (perfil, espaçamento nominal, área útil). `create_checkpoint`.
2. Caminho validado: ExG reamostrado a ~8 cm (média) em blocos de 20 m com 4 m de sobreposição → FFT 2D por bloco (pico no período de 0,8–1,2× o nominal; até 2 orientações por bloco para divisas) → crista do sinal (demodulação; ou a versão rápida por projeção, se "rápido") → só o miolo de cada bloco → união dos segmentos vizinhos (0,35 m e 30°). Teste num bloco, meça o tempo, rode em lotes de ~40 s gravando o parcial.
3. Grave `linhas` no GPKG com `id`, `comprimento_m`, `bloco_orientacao` (tipos Python, não numpy) e confira `featureCount()`. `add_vector_layer` + `set_simple_symbol` (linha fina, cor forte) para o usuário ver sobre a imagem.
4. Se houver janelas com referência `linha` (`/anotacao linhas`), rode o `/validar-deteccao` nas linhas: % de fileiras, cobertura, espaçamento (p10, mediana, p90), desvio lateral p50/p90. Sem janelas, o resultado sai "não validado" e você oferece o `/janelas-validacao`.
5. Responda: nº de linhas, km, espaçamento mediano e p10–p90, cobertura, onde pode ter falhado (divisa de blocos, bordas, curvas), o status de validação e o caminho da camada.

Nenhum número sem o status de validação. Leitura do dado, não recomendação. O usuário está olhando o QGIS — não capture a tela.
