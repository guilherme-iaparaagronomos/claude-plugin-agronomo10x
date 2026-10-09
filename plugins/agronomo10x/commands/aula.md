---
description: Acha na comunidade agrônomo10X a aula ou live sobre um tema e traz o trecho, o minuto e o link
argument-hint: "<tema ou pergunta> [data da live]"
---

Procure conteúdo da comunidade sobre o tema em $ARGUMENTS (se vazio, pergunte o tema).

1. Chame `recomendar_conteudo` do conector `comunidade` com o tema. Se o pedido citar uma data ("a live do dia 12"), use também `catalogo_lives`.
2. Para cada item devolvido, diga o título, se é aula ou live, a trilha quando houver, o trecho ou capítulo mais ligado ao tema com o minuto, e o caminho completo em `https://comunidade.agronomos.ia.br/...`.
3. Se o usuário quiser aprofundar num item, abra com `aula_conteudo` ou `live_conteudo` (slug) e resuma os capítulos com minutos. Conteúdo que exige o plano Pro: diga isso e aponte `/planos`, sem reproduzir.
4. Se o tema puder ser feito na prática com a ClaudIA Sat ou a ClaudIA QGIS, ofereça seguir pela skill `do-conteudo-a-pratica`.

Só o que as ferramentas devolveram: nunca invente aula, live ou minuto. Resumo e tags podem ter sido gerados automaticamente; o fato técnico vem do trecho.
