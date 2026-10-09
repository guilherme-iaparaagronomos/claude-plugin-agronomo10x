---
description: Relatório de UMA PÁGINA da análise de drone para o cliente — cabeçalho, os 3 a 5 números que decidem no desafio, um mapa com legenda e escala, a validação em duas linhas, três ressalvas e a frase de capa; PDF A4 gerado pelo layout do QGIS
argument-hint: "[desafio: linhas | falhas | contagem | uniformidade | copas | daninhas] [talhão]"
---

Argumentos: $ARGUMENTS

Skill: `drone-relatorio`. É a versão curta do `/relatorio-drone`: sem método, sem tabelas longas, sem evidências.

1. Leia o `estado.json`: análise, critério e origem, status de validação, janelas, tolerância, margem. Sem validação, o status "não validado" aparece na página — não omita.
2. Escolha os 3–5 números do desafio que o cliente usa para decidir: falhas → % no critério (com o critério escrito), metros de falha por hectare, classe na escala, mudas estimadas (informação); contagem → plantas por hectare útil, % de emergência, faltantes; linhas → nº de linhas, espaçamento mediano, cobertura; uniformidade → CV, % falho e % duplo; copas → nº, área média, cobertura %; daninhas → área infestada em ha e %, nº de manchas.
3. Monte no QGIS: `create_checkpoint`; `create_layout` ("Uma página — <desafio>", A4 retrato) → `add_layout_label` com o cabeçalho (fazenda/talhão, data do voo, pixel, área útil) → `add_layout_label` com os números em destaque (um por linha, valor grande e rótulo curto) → `add_layout_map` do talhão com a camada do resultado (falhas com classe, pontos, zonas ou linhas), `add_layout_legend` e `add_layout_scalebar` → `add_layout_label` com a validação em duas linhas ("validado às cegas em N janelas; X % encontrados, ±Y pontos; tolerância Z m") → `add_layout_label` com as três ressalvas principais e a frase de capa → `export_layout` em PDF para `analise_drone/relatorio_1pagina_<desafio>_<AAAA-MM-DD>.pdf`.
4. Grave o mesmo conteúdo em `analise_drone/relatorio_1pagina_<desafio>_<data>.md` e, no chat, responda com o texto da página e o caminho do PDF.

Informação, não recomendação: replantio, dose e manejo são do responsável técnico. Nada sobre a tecnologia por trás. Não capture a tela: o PDF é a entrega.
