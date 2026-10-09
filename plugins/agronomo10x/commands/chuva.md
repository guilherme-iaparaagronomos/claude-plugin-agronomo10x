---
description: Chuva histórica de uma fazenda salva na ClaudIA Clima (desde 1998) — por mês ou por ano conforme o período, comparada à média 1991–2020, com dias de chuva, veranico e graus-dia quando pedido; "como está a chuva deste ano" comparada com os outros anos (contexto)
argument-hint: "<fazenda | lat,long> [período: safra 2024/25 | últimos 5 anos | 2020 a 2025 | este ano | deste ano] [graus-dia base N]"
---

Argumentos: $ARGUMENTS

Conector de clima: `claudia-clima`. Se ele não aparecer na instalação, peça para o usuário atualizar o plugin (0.3.1 ou mais novo) ou conectar pela aba Conectar em `https://comunidade.agronomos.ia.br/solucoes/mcp/clima` — as ferramentas de clima não estão mais no conector de satélite.

1. Sem fazenda nos argumentos, chame `listar_fazendas` do conector `claudia-clima` e pergunte qual (latitude e longitude também servem).
2. Traduza o período em datas e DIGA a tradução: "safra 2024/25" = 01/09/2024 a 31/08/2025 (padrão da casa; o usuário pode mudar); "últimos 5 anos" = os 5 anos-calendário completos; "este ano" = 01/01 até hoje; sem período = os últimos 12 meses completos.
3. Chame `clima_historico` com `fazenda` (ou lat/long), `data_inicio`, `data_fim`, `comparar_media: true` e `escala`: `dia` até 92 dias, `mes` até ~3 anos, `ano` acima disso. Graus-dia só se pedido: `base_gdd_c` com a base informada; sem base, pergunte e, se o usuário não souber, use 10 °C dizendo que é genérico.
4. Responda com a tabela por mês ou por ano: total em mm · % contra a normal · dias de chuva; depois o maior veranico com as datas e, se pedido, os graus-dia. Siga a skill `clima-na-fazenda`: em período de 1,5 ano ou mais fale POR ANO; marque ano ou mês incompleto ("2026 vai até 09/10 — não compare com os anos inteiros").
5. **"Como está a chuva deste ano?"**, "está chovendo mais que o normal?", "é ano de El Niño?", "este ano parece com qual?" (ou o período "deste ano"): chame `contexto_chuva` com `fazenda` (ou lat/long) e repasse as frases como a ferramenta devolve — acumulado desde 1º de julho, ano típico até a mesma data, "choveu mais que X % dos anos", a faixa de metade dos anos, o que costuma vir até 31/12, a fase do Pacífico dita sem sigla e só onde foi verificado o que ela costuma significar, até 2 anos parecidos. É DESCRIÇÃO do registro, não previsão: nunca converta em "vai chover N mm" nem diga que o ano será igual a outro.
6. Ressalva fixa: chuva de pluviômetros e satélites processada pela comunidade agrônomo10X; a série começa em 1998. Gráfico não existe pelo conector (só no WhatsApp da ClaudIA Geo).

Leitura do dado, não recomendação de manejo. Só números que a ferramenta devolveu. Nada sobre a tecnologia por trás do processamento.
