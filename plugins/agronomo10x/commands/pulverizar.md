---
description: Janelas de pulverização de uma fazenda salva na ClaudIA Clima (Delta T, vento e chuva prevista hora a hora, agrupadas por período do dia) — padrão 48 horas, até 7 dias
argument-hint: "<fazenda | lat,long> [horas: 24 | 48 | 72 | 168]"
---

Argumentos: $ARGUMENTS

Conector de clima: `claudia-clima`; se ele não existir na instalação (a ClaudIA Clima ainda não foi lançada), as mesmas ferramentas de clima estão no conector `claudia-sat` — use-as de lá, sem tratar como erro.

1. Sem fazenda nos argumentos, chame `listar_fazendas` do conector `claudia-clima` e pergunte qual (latitude e longitude também servem).
2. Chame `janela_pulverizacao` com `fazenda` (ou lat/long) e `horas` (48 por padrão; "amanhã" = 48; "esta semana" = 168; mínimo 12, máximo 168). Chame `previsao_tempo` com `dias` = teto(horas ÷ 24) para a chuva.
3. Responda com uma tabela por dia e período (madrugada 0–6 · manhã 6–12 · tarde 12–18 · noite 18–24): Delta T típico · vento típico · chuva prevista · classe da ferramenta (ideal / atenção / inadequada). Abaixo, as janelas ideais mais longas com hora de início e fim.
4. Use SÓ a classificação que a ferramenta devolveu (os limites de Delta T e vento são dela). Chuva prevista perto de uma janela ideal é aviso, não veto: diga a hora e os mm.
5. Frase fixa de fechamento: "janela ideal pelos parâmetros de Delta T e vento; a decisão de aplicar, o produto e a dose são do responsável técnico". Do 4º dia em diante, marque como tendência.

Dados de satélite modelados, processados pela comunidade agrônomo10X; nada sobre a tecnologia por trás. Gráfico de Delta T existe só no WhatsApp da ClaudIA Geo.
