---
name: drone-contagem
description: "Contagem de plantas e árvores em ortomosaico de drone (diagnóstico do padrão de plantio, mapa do alvo, máximos locais ou picos na fileira), plantas por hectare útil e por metro, emergência, uniformidade de estande e plantas faltantes em perenes. Use para \"contar plantas\", \"estande\", \"população\", \"árvores por hectare\", \"uniformidade\", \"faltantes\"."
---

<!-- GERADO por scripts/gera-drone.mjs a partir do playbook analise-drone-qgis (skills-agro, versão b133424b) + scripts/drone-extras/. Não edite à mão: corrija a fonte e gere de novo. -->

# ClaudIA Drone — contagem de plantas

## 3. Contagem de plantas

1. **Diagnostique o padrão de plantio antes de contar.** Faça a FFT do perfil ao longo de 3–5 fileiras: o período é o espaçamento entre plantas. Foi isso que mostrou que a primeira referência do pomar dividia copas: eram 56 plantas, e não 91.
2. **Mapa do alvo.**
    - K-means com 6 classes de cor (cromaticidade r e g, brilho), com amostra tirada **fora** das janelas de validação.
    - Dê peso 1 às classes de copa e 0,5 às duvidosas. Confira as classes olhando a imagem.
3. **Suavização gaussiana** com σ de ~0,15× o diâmetro da copa (0,35 m para copa de 2,3 m), a ~10 cm de resolução.
4. **Máximos locais**, sem scikit-image:
    - pixel igual ao `scipy.ndimage.maximum_filter` com raio = distância mínima;
    - valor acima do limiar (0,25 no mapa de 0 a 1);
    - distância mínima de ~0,65× o espaçamento entre plantas (1,6 m para 2,5 m).
5. **Variante igualmente boa:** ache a fileira e conte os picos ao longo dela.
6. **Grave os pontos** e reporte plantas por hectare útil, por talhão.

**Resultado de referência (pomar, 5 cm, fileiras de 3,4 m, plantas a 2,5 m):**
- clássico: F1 de 88,9% e erro de −4,6%;
- com SAM e refinos: F1 de 92,5% e erro de −5,9%;
- ambos em 5 janelas de 20 m, com tolerância de 0,8 m.

**Cuidados**
- **A tolerância de pareamento muda muito o F1:** 80% com 0,6 m e 95% com 1,0 m. Declare sempre. Padrão: o menor entre metade do espaçamento na linha e o raio da copa.
- **Copas encostadas** se fundem por cor. Altura (modelo de superfície da fotogrametria) ou SAM ajudam.
- **Milho e soja jovens** pedem pixel de até 1 cm. A 3–5 cm, avise a expectativa baixa e meça.
- **Reajustar parâmetros em janelas grandes não melhorou:** o resultado é estável numa faixa larga.

## Emergência e população

Com a população semeada (ou o espaçamento nominal entre plantas e entre linhas) informada pelo usuário: **% de emergência = contado ÷ semeado**, por talhão e por hectare útil; plantas por metro linear = contadas ÷ metros de linha analisados. Sem o semeado, entregue só o contado e pergunte.

## Uniformidade de estande (`/uniformidade-estande`)

Linhas + plantas → espaçamentos entre plantas vizinhas na fileira → coeficiente de variação, % de espaçamentos aceitáveis (0,5× a 1,5× o esperado), % falhos (acima de 1,5×) e % duplos (abaixo de 0,5×), pela régua ABNT de plantabilidade; o esperado vem do usuário (ou da periodicidade medida na fileira, declarada como tal). Classe de desempenho só com os limites escritos no relatório, porque variam entre fornecedores. Validação: diferença de CV e de % de falhos e duplos até 5 pontos da referência. Lembre o cuidado: duas plantas lidas como uma inflam os "duplos" para baixo e os "falhos" para cima.

## Plantas faltantes em perenes (`/faltantes`)

Linhas + plantas → posições esperadas pelo espaçamento ao longo da fileira → posição sem planta a menos de meia tolerância = faltante → lista de replantio com coordenadas e mapa. Precisa do espaçamento nominal (do usuário) e de linhas confiáveis. Entregue a lista; a decisão de replantar é do responsável técnico.

## Entregáveis

- Grãos: plantas totais, por hectare útil e por metro, população real × esperada, % de emergência, uniformidade.
- Perenes: plantas, faltantes com coordenadas, área de copa por planta quando houver segmentação.
- Florestal: árvores por hectare, sobrevivência, pontos de replantio.
- Camadas: `plantas` (pontos, com `classe` e `janela_id` quando dentro de janela), `faltantes`, densidade por célula.
- Validação pelo `/validar-deteccao` com a referência `planta` do `/anotacao`; a tolerância vai SEMPRE junto do F1.

## Referências desta skill

- `references/trechos.md`

---
Fonte do método: playbook `analise-drone-qgis` da comunidade agrônomo10X (skills-agro, MIT; versão b133424b). Sigilo, informação (não recomendação) e as regras dos conectores: skill `roteamento-agronomo10x`.
