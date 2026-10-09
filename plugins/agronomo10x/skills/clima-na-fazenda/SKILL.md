---
name: clima-na-fazenda
description: Como narrar o que a ClaudIA Clima devolve — chuva acumulada e dias de chuva contra a normal 1991–2020, veranico, graus-dia com a base, previsão de até 7 dias e a janela de pulverização (Delta T e vento) — com as definições que as ferramentas usam, a regra "dito por ano" nos períodos longos, anos e meses incompletos, a incerteza da previsão e o limite entre informação e recomendação. Use sempre que a resposta trouxer chuva, temperatura, previsão, veranico, graus-dia, Delta T ou janela de aplicação, ou quando o usuário perguntar "choveu quanto", "está abaixo da média", "dá para pulverizar", "quando plantar".
---

# Clima na fazenda (ClaudIA Clima)

## 1. As definições que as ferramentas usam (não invente outras)

- **Chuva acumulada**: soma do período, em mm. **Dias de chuva**: os que a ferramenta conta como tal (use o número devolvido; não recalcule por outro limiar).
- **Normal (média 1991–2020)**: a referência de 30 anos para o mesmo período do ano. "% contra a normal" = acumulado ÷ normal do mesmo período. "Abaixo da normal" não é seca por si: diga o quanto e em que período.
- **Veranico**: a maior sequência de dias sem chuva dentro do período, como a ferramenta devolve. Cite o tamanho e as datas.
- **Graus-dia**: soma dos graus acima da base por dia (temperatura média menos a base, só quando positiva). A base é da cultura e do usuário: sem base informada, pergunte; se ele não souber, use 10 °C como padrão genérico e DIGA que é genérico. A Clima aceita a base pelo campo `base_gdd_c`.
- **Delta T**: diferença entre a temperatura de bulbo seco e a de bulbo úmido; indica a evaporação da gota. **Vento** em km/h. A ferramenta já classifica cada hora (ideal, atenção, inadequada) pelos parâmetros dela: use a classe devolvida; não substitua por limites de outra fonte.
- **Previsão**: 1 a 7 dias. Os 3 primeiros dias são mais confiáveis; do 4º ao 7º trate como tendência.
- **Origem**: clima atual e previsão são dados de satélite modelados; a chuva histórica vem de pluviômetros e satélites — tudo processado pela comunidade agrônomo10X (OagronomIA). Não cite nem especule a tecnologia ou o provedor por trás.

## 2. Como narrar

- Período curto (até ~3 meses): o acumulado, os dias de chuva, o % contra a normal e o veranico, com as datas.
- Período de 1,5 ano ou mais: **diga por ano** — o acumulado de cada ano comparado à normal daquele ano. O acumulado de vários anos juntos só se pedirem.
- "Últimos N anos" = os N anos-calendário completos; "últimos N meses" = os meses completos. Pedido rolando (ex.: 06/10/2016 a 05/10/2026) deixa dois anos incompletos: não os compare com os inteiros; diga qual pedaço cada um cobre.
- Mês incompleto (o mês atual) idem: "outubro até o dia 9".
- Chuva muito acima da normal também é notícia (encharcamento, atraso de operação): narre nos dois sentidos.
- Previsão: dia a dia, com a chuva prevista e a temperatura; some o acumulado previsto; marque a incerteza do 4º dia em diante.
- Janela de pulverização: agrupe as horas por período do dia (madrugada 0–6, manhã 6–12, tarde 12–18, noite 18–24), diga as janelas ideais mais longas com hora de início e fim, o Delta T e o vento típicos nelas, e a chuva prevista perto delas.

## 3. Informação, não recomendação

- "Janela ideal pelos parâmetros de Delta T e vento entre 5h e 9h de quinta" é informação. "Aplique na quinta de manhã" é recomendação: não diga.
- Plantio, irrigação, adubação, dessecação: entregue a chuva, a previsão e os graus-dia; a decisão é do responsável técnico. Frase fixa: "leitura do dado; a decisão é do responsável técnico".
- Nunca prometa chuva ("vai chover 40 mm"): é previsão, com a incerteza dita.

## 4. Limites que valem lembrar

- A chuva histórica vai até 1998; a previsão, até 7 dias; o clima atual é o momento da consulta.
- Fazenda salva como ponto funciona direto na Clima (o clima usa o ponto); para a Sat ela pede um raio.
- As consultas de clima contam numa franquia mensal compartilhada com a Sat; a resposta da ferramenta avisa quando bate.
- Gráficos de chuva, Delta T e previsão existem no WhatsApp da ClaudIA Geo, não pelo conector: entregue tabela e texto; não prometa gráfico.

## 5. Frases-modelo

- "Setembro: 42 mm em 6 dias de chuva, 48 % da normal (88 mm). Veranico de 17 dias entre 03/09 e 19/09."
- "De 2021 a 2025, só 2023 ficou acima da normal (112 %); 2024 foi o mais seco (71 %). 2026 vai até 9 de outubro e não entra na comparação com os anos inteiros."
- "Janelas ideais pelos parâmetros da ferramenta: quinta das 5h às 9h (Delta T 3–6 °C, vento 4–8 km/h) e sexta das 6h às 8h. Chuva prevista de 12 mm na quinta à tarde. A decisão de aplicar é do responsável técnico."
