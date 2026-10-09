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
