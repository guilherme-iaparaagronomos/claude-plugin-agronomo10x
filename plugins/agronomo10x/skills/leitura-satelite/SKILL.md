---
name: leitura-satelite
description: Como ler e descrever um índice de vegetação (NDVI, NDRE) ou uma imagem RGB do Sentinel-2 que a ClaudIA Sat devolveu — faixas de referência como orientação, comparação dentro da fazenda e no tempo, nuvem, sombra, borda e pixel de 10 m, cruzamento com o clima como coincidência e o que nunca afirmar. Use sempre que a resposta trouxer NDVI, NDRE, RGB, curva temporal, composto de período ou laudo de satélite, ou quando o usuário perguntar "o que significa esse valor", "por que caiu", "qual talhão está pior", "isso é doença?".
---

# Leitura de satélite (ClaudIA Sat)

A ferramenta entrega o número; você entrega a leitura. Leitura é descrever o que o índice mostra, onde e quando — nunca diagnosticar a causa nem recomendar manejo.

## 1. Faixas de referência (orientação, não diagnóstico)

Valem como ponto de partida; variam com cultura, fase, solo e época. Diga sempre "faixa de referência geral".

| NDVI | Leitura usual |
|---|---|
| abaixo de 0,2 | solo exposto, palhada, água, área sem vegetação ativa |
| 0,2 a 0,4 | emergência, cobertura baixa, vegetação rala ou em senescência |
| 0,4 a 0,6 | cobertura parcial, dossel em formação ou em declínio |
| 0,6 a 0,9 | dossel fechado e vigoroso; acima de ~0,8 o NDVI satura (muito e muitíssimo ficam parecidos) |

NDRE: valores menores que o NDVI (dossel cheio costuma ficar entre 0,2 e 0,5), mais sensível quando o dossel está fechado e ao teor de clorofila — é o índice para separar talhões no pico da safra, quando o NDVI já saturou. RGB: serve para ver solo exposto, falhas grandes, água, carreadores e nuvem; não mede vigor.

## 2. Como comparar

- **Dentro da fazenda**: talhão contra a média da fazenda na mesma cena ("talhões 3 e 7 abaixo da média: 0,52 e 0,49 contra 0,63").
- **No tempo**: a mesma área ao longo da curva ("subiu de 0,35 para 0,71 em 40 dias"; "caiu 0,12 entre 02/09 e 12/09").
- **Nunca o valor absoluto entre fazendas, culturas ou fases diferentes**: 0,55 pode ser ótimo numa cultura e fraco noutra.
- **Mediana de período** (composto) para tirar o ruído de uma cena só; cena única logo após chuva forte, colheita ou dessecação engana.
- Diferença de fenologia entre talhões (plantio em datas diferentes) não é problema: é fase. Pergunte a data de plantio quando a diferença for grande.

## 3. O que enfraquece a leitura (diga quando valer)

- Nuvem e sombra de nuvem: use o % livre que a Sat informou; cena abaixo de ~80–95 % livre pede cautela, e mancha escura "redonda" pode ser sombra.
- Borda do talhão: pixel misto com carreador, mata ou vizinho; ignore a faixa de borda na leitura.
- Pixel de 10 m: talhão com menos de ~1 ha tem poucas dezenas de pixels — "leitura frágil", prefira a mediana do período.
- Datas: a cena é de um dia; o que aconteceu depois não aparece.
- Índice saturado em dossel fechado: diferenças pequenas no NDVI alto não significam nada; olhe o NDRE.

## 4. Como descrever

- Padrão espacial com lugar e número: "o terço norte do talhão 3 está 0,15 abaixo do resto", "mancha de ~2 ha no canto leste".
- Tendência com datas: "pico em 20/08 (0,78) e queda desde então".
- Queda de 0,10 ou mais entre duas cenas seguidas: chame de "queda a investigar", sem causa.
- Cruzar com o clima só como coincidência: "a queda coincide com um veranico de 18 dias" / "com chuva 60 % abaixo da normal no mês". Nunca "foi causado por".
- Feche com o que conferir em campo: onde ir, o que olhar.

## 5. O que nunca afirmar

- Causa (praga, doença, deficiência nutricional, falha de irrigação, compactação). Diga: "pode ter várias causas — água, nutrição, pragas e doenças, solo, manejo; a conferência é em campo".
- Produtividade a partir do índice.
- Dose, produto, replantio ou qualquer manejo. Frase fixa: "leitura do dado; a decisão é do responsável técnico".
- Data futura ("vai recuperar até…").

## 6. Frases-modelo

- "NDVI médio de 0,64 em 12/09 (cena com 97 % livre de nuvem). Os talhões 2 e 5 estão abaixo da média da fazenda (0,51 e 0,48); o padrão é uma faixa no lado norte dos dois, não o talhão inteiro."
- "Na curva de 120 dias o talhão 4 subiu de 0,30 para 0,75 e caiu 0,13 nas duas últimas cenas. A queda coincide com 21 dias sem chuva registrados pela Clima. Vale conferir em campo antes de qualquer decisão."
- "O composto da mediana de agosto a setembro tira o efeito de uma cena com sombra de nuvem: na mediana, a diferença entre os talhões cai para 0,05."

## 7. Sigilo e formato

As imagens são do satélite Sentinel-2, processadas pela comunidade agrônomo10X (OagronomIA). Não cite, deduza nem especule plataforma, engine, biblioteca ou provedor por trás. Só números que a ferramenta devolveu, com a data da cena e o % livre de nuvem. Links de arquivo valem 1 hora.
