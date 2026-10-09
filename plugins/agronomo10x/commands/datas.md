---
description: Cenas de satélite disponíveis para uma fazenda salva na ClaudIA Sat, com o % livre de nuvem de cada uma, para escolher a data antes de gerar a imagem
argument-hint: "<fazenda> [talhão] [período — padrão: últimos 90 dias]"
---

Argumentos: $ARGUMENTS

1. Sem fazenda nos argumentos, chame `listar_fazendas` do conector `claudia-sat` e pergunte qual.
2. Chame `datas_disponiveis` com `fazenda` (e `talhao` quando citado), `data_inicio` e `data_fim` (padrão: os últimos 90 dias; aceite "safra", "agosto", "desde 01/07").
3. Responda com a lista ordenada por data (mais recente primeiro): data · % livre de nuvem. Marque a melhor cena do período e as três últimas com 95 % ou mais; se nenhuma passar de 80 %, diga isso e indique a menos nublada.
4. Ofereça o próximo passo: "quer o NDVI de <data>?" — nesse caso siga o comando `/ndvi` com `data_inicio` e `data_fim` iguais à data escolhida.

Só as datas e percentuais que a ferramenta devolveu. Leitura do dado, não recomendação de manejo. Nada sobre a tecnologia por trás do processamento.
