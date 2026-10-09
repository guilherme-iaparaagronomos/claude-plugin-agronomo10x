---
description: Curva temporal do índice (NDVI ou NDRE) talhão a talhão de uma fazenda salva na ClaudIA Sat, com ranking, quedas a investigar e a chuva do mesmo período da ClaudIA Clima como contexto
argument-hint: "<fazenda> [ndvi|ndre] [talhão | talhões] [período — padrão: últimos 120 dias]"
---

Argumentos: $ARGUMENTS

Conector de clima: `claudia-clima`; se ele não existir na instalação (a ClaudIA Clima ainda não foi lançada), as mesmas ferramentas de clima estão no conector `claudia-sat` — use-as de lá, sem tratar como erro.

1. Sem fazenda nos argumentos, chame `listar_fazendas` do conector `claudia-sat` e pergunte qual.
2. Chame `curva_indice` com `fazenda`, `indice` (`ndvi` por padrão; `ndre` quando pedido ou quando o usuário quer separar talhões com dossel fechado), `data_inicio`/`data_fim` (padrão: últimos 120 dias) e `todos_talhoes: true` — ou `talhoes: [...]`/`talhao` quando ele citou alguns. Período acima de 400 dias: divida em chamadas safra a safra e junte.
3. Monte a tabela por talhão: último valor e data · pico e data · variação dos últimos 30 dias · posição no ranking (maior para menor no último valor). Abaixo, a lista dos talhões abaixo da média da fazenda na última cena e os que tiveram queda de 0,10 ou mais em duas cenas seguidas ("queda a investigar").
4. Chame `clima_historico` do conector `claudia-clima` com a mesma `fazenda` e o mesmo período (`comparar_media: true`). Cite o acumulado, o % contra a normal, os dias de chuva e o maior veranico com as datas. Quando uma queda coincide com veranico ou com chuva muito acima da normal, escreva "coincide com" — nunca "foi causado por".
5. Quando você tem acesso a pastas, salve `agronomo10x/<fazenda>/curva_<indice>_<inicio>_<fim>.csv` (data, talhão, valor) e informe o caminho. Gráfico não existe pelo conector: não prometa.
6. Feche com as ressalvas da skill `leitura-satelite` que valerem: pixel de 10 m (talhão pequeno = leitura frágil), cenas com nuvem ou sombra, saturação do NDVI em dossel fechado.

Leitura do dado, não recomendação de manejo (sem causa, sem dose, sem produto). Só números que as ferramentas devolveram. Nada sobre a tecnologia por trás do processamento.
