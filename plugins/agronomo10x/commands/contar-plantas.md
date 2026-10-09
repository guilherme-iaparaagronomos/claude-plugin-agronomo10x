---
description: Contagem de plantas ou árvores no ortomosaico de drone aberto no QGIS (diagnóstico do padrão de plantio, mapa do alvo, máximos locais ou picos na fileira), com plantas por hectare útil, % de emergência quando há a população semeada, e validação com tolerância declarada
argument-hint: "[espaçamento entre plantas em m] [população semeada por ha | plantas por metro] [talhão]"
---

Argumentos: $ARGUMENTS

Skills: `drone-contagem`, `drone-validacao`, `drone-roteiro`. Com o módulo da ClaudIA QGIS: `cd.receitas.contagem_maximos` ou `contagem_na_fileira`; sem ele, o caminho clássico.

1. Sessão (`/cena-drone` se não houver) e `create_checkpoint`. Resolução: milho e soja jovens pedem pixel de até ~1 cm; a 3–5 cm avise a expectativa baixa e meça mesmo assim.
2. **Diagnostique o padrão antes de contar**: FFT do perfil ao longo de 3–5 fileiras → espaçamento entre plantas (foi isso que mostrou 56 plantas, e não 91, no pomar de referência). Compare com o nominal informado.
3. Mapa do alvo: k-means com 6 classes de cor (cromaticidade r e g, brilho) com amostra tirada FORA das janelas de validação; peso 1 às classes de copa e 0,5 às duvidosas (confira olhando a imagem com o usuário). Suavização gaussiana com σ ≈ 0,15× o diâmetro da copa, a ~10 cm.
4. Máximos locais (`scipy.ndimage.maximum_filter` com raio = distância mínima ≈ 0,65× o espaçamento; limiar 0,25 no mapa 0–1) — ou picos ao longo da fileira quando há linhas. Copas encostadas: oferecer altura (DSM − DTM) ou o `/segmentar` (SAM por ponto) como refino.
5. Grave `plantas` (pontos) no GPKG com tipos Python; `add_vector_layer` com símbolo pequeno e forte. Plantas por hectare útil (descontando carreadores e bordas com `ref_excluir`, se houver) e por metro linear; com a população semeada, % de emergência = contado ÷ semeado e real × esperada.
6. Validação: com referência `planta` nas janelas, `/validar-deteccao` com a tolerância padrão (o menor entre metade do espaçamento na linha e o raio da copa) e também 0,5×, 0,75× e 1,0× — o F1 muda muito com a tolerância, declare sempre. Sem janelas, "não validado" e ofereça o `/janelas-validacao`.
7. Responda: total, por hectare útil, por metro, emergência (se houver), status de validação com tolerância e margem, ressalvas (copas encostadas, planta pequena para o pixel) e caminhos. Uniformidade e faltantes: `/uniformidade-estande` e `/faltantes`.

Leitura do dado; replantio e manejo são do responsável técnico. O usuário está olhando o QGIS — não capture a tela.
