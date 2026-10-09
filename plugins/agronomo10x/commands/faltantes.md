---
description: Plantas faltantes em perenes (citros, café, eucalipto) no ortomosaico de drone aberto no QGIS — posições esperadas pelo espaçamento ao longo das linhas, posição sem planta = faltante, lista de replantio com coordenadas e mapa
argument-hint: "[espaçamento nominal entre plantas em m] [tolerância em m] [talhão]"
---

Argumentos: $ARGUMENTS

Skill: `drone-contagem` (faltantes). Com o módulo da ClaudIA QGIS: `cd.receitas.faltantes_perene`; sem ele, o caminho abaixo. Medição de versão 1 do plano; na versão 0 reporte como "método ainda sem caso validado".

1. Precisa das linhas e das plantas (`/linhas-plantio`, `/contar-plantas`) e do espaçamento nominal (do usuário; sem ele, a periodicidade medida na fileira, declarada como medida).
2. Para cada linha, gere as posições esperadas a cada espaçamento a partir da primeira planta detectada (ou de um alinhamento por mínimos quadrados sobre as plantas da linha); posição sem planta a menos de meia tolerância (padrão: 0,5× o espaçamento) é faltante. Pontas da linha sem planta não contam como faltante sem confirmação.
3. Grave `faltantes` (pontos com `linha_id`, `x`, `y`, `posicao_na_linha`) e `add_vector_layer` com símbolo distinto; exporte a lista em CSV (`analise_drone/faltantes_<talhao>.csv`) e em shapefile/KML se pedido.
4. Números por talhão: plantas, faltantes, % de faltantes sobre as posições esperadas, plantas por hectare útil; mapa de faltantes por célula.
5. Cuidado: copas grandes cobrindo a posição vizinha escondem faltantes e plantas lidas em dobro criam faltantes falsos — o status de validação da contagem (tolerância e F1) limita esta medição; confira em campo uma amostra das faltantes antes de replantar.
6. Responda com os números, a lista (ou o caminho do CSV), o status de validação, as ressalvas e os caminhos.

A lista é informação; replantar é decisão do responsável técnico. O usuário está olhando o QGIS — não capture a tela.
