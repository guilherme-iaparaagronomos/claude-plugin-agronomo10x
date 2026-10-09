---
description: Resumo curto do clima de uma fazenda salva na ClaudIA Clima — chuva recente contra a média, previsão de 7 dias e janela de pulverização de 48 h (para o detalhe, /chuva e /pulverizar)
argument-hint: "<fazenda | lat,long> [período da chuva — padrão: últimos 30 dias]"
---

Resuma o clima de uma fazenda salva na ClaudIA Clima. Argumentos: $ARGUMENTS (nome da fazenda e, se quiser, o período da chuva — padrão: os últimos 30 dias).

Conector de clima: `claudia-clima`. Se ele não aparecer na instalação, peça para o usuário atualizar o plugin (0.3.1 ou mais novo) ou conectar pela aba Conectar em `https://comunidade.agronomos.ia.br/solucoes/mcp/clima` — as ferramentas de clima não estão mais no conector de satélite.

1. Sem fazenda nos argumentos, chame `listar_fazendas` do conector `claudia-clima` e pergunte qual.
2. Chame, com o campo `fazenda`: `clima_historico` (período pedido ou os últimos 30 dias, `comparar_media` ligado), `previsao_tempo` (7 dias) e `janela_pulverizacao` (próximas 48 horas).
3. Responda em um bloco curto: chuva acumulada e dias de chuva no período, como ficou contra a média histórica, a previsão dia a dia e as janelas de pulverização recomendadas pelos parâmetros da ferramenta. Cite só os números que as ferramentas devolveram.

Leitura do dado, não recomendação de manejo. Nada sobre a tecnologia por trás do processamento.
