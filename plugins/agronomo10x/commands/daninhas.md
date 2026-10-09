---
description: Daninhas e outras plantas fora do padrão no ortomosaico de drone aberto no QGIS — candidatas fora da linha por forma e cor, conferência uma a uma, área infestada e manchas, e as zonas de aplicação na grade do equipamento (sem produto nem dose)
argument-hint: "[largura da barra em m] [talhão] [classe: folha larga | estreita]"
---

Argumentos: $ARGUMENTS

Skills: `drone-segmentacao` (outras plantas e daninhas), `drone-validacao`. Com o módulo da ClaudIA QGIS: `cd.receitas.outras_plantas` e, com GPU e exemplos, `segmentar_exemplos` (SAM 3); sem ele, o caminho clássico.

1. Precisa das linhas (`/linhas-plantio`) — a regra é "vegetação fora da linha". `create_checkpoint`.
2. Candidatas: da máscara de vegetação (ExG acima do limiar local), tire o que tem forma de fileira (abertura morfológica com raio ≈ 0,40 m na cana; ajuste pelo espaçamento) e fique com as manchas longe das linhas, mais verdes ou mais escuras que a cultura. Ordene por tamanho e contraste. Nunca filtre "mato" só pela cor: remove plantas verdadeiras.
3. Conferência: janela a janela, o usuário olha cada candidata no QGIS (zoom pela `set_canvas_extent`) e responde "daninha", "cultura" ou "dúvida" — ou, quando você consegue ver os recortes, aplique o protocolo visual com marcas numeradas (até 25 por imagem). Na cana de referência, 14 candidatas viraram 3 confirmadas. Daninha DENTRO da linha com a mesma cor da cultura exige forma, textura ou modelo treinado: diga isso.
4. Grave `daninhas` (polígonos confirmados, com `classe` se o usuário a definiu) e `candidatas_daninha` (todas, com o veredito). Números: área infestada em hectares e % da área útil, nº e tamanho das manchas (média, maior).
5. **Zonas de aplicação** (se pedidas): grade no tamanho da barra informada (`native:creategrid`, retângulo ou hexágono), célula marcada quando contém mancha confirmada (`native:extractbylocation` ou `zonal_statistics`), mancha mínima ≥ 2× a seção da barra, buffer declarado (ex.: −3 a −6 m); `export_layer` em shapefile ou KML com um campo numérico de classe (`aplicar` 0/1 ou classes por densidade). Sem produto, sem dose, sem ISOXML (o QGIS não gera — diga isso). Recomende conferir em campo as 3–5 maiores manchas antes de qualquer uso.
6. Validação: com referência `daninha` nas janelas, `/validar-deteccao` (IoU da classe, área infestada × referência). Sem janelas, "não validado".

Informação, não recomendação. O usuário está olhando o QGIS — não capture a tela.
