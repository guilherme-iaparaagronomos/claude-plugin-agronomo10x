---
description: Falhas de plantio no ortomosaico de drone aberto no QGIS pelo motor híbrido v3 (plantas como picos + solo exposto + limiar local), com o critério do usuário, todas as candidatas gravadas e a tabela por critério e por classe de comprimento
argument-hint: "[critério: comprimento mínimo em m, solo exposto | distância entre plantas] [talhão]"
---

Argumentos: $ARGUMENTS

Skills: `drone-falhas` (o motor e os critérios), `drone-validacao`, `drone-roteiro`. Com o módulo da ClaudIA QGIS: `cd.receitas.falhas_hibrido(s, ...)`; sem ele, o caminho clássico com o núcleo do v3 de `references/trechos.md`.

1. Exige linhas: sem a camada `linhas` na sessão, rode o `/linhas-plantio` antes. `create_checkpoint`.
2. **Critério**: se não veio nos argumentos, pergunte numa mensagem só — comprimento mínimo da falha, se mede solo exposto ou distância entre plantas, classes desejadas. Sem resposta, ofereça as sugestões da skill (Stolf 1986 para cana: vão > 0,50 m; régua ABNT para grãos: > 1,5× o espaçamento), diga que são referências antigas e registre a origem no `estado.json`. Não recuse rodar por falta de critério.
3. Motor v3: limiar local de solo por trecho de ~25 m (Otsu − 0,02, mínimo 0,05); perfil ao longo de cada linha a cada 5 cm (maior ExG numa faixa de ±0,15 m, suavizado 0,1 m); plantas = picos ≥ limiar a ≥ 0,1 m; falha = solo exposto entre plantas a mais de 0,5 m; pontas das linhas não contam. Lotes de ~40 s com parcial gravado.
4. Grave TODAS as candidatas em `falhas_candidatas` (`linha_id`, `ini_m`, `fim_m`, `comp_solo_m`, `dist_plantas_m`, `limiar_local`) e a camada filtrada `falhas_<criterio>`; `add_vector_layer` com símbolo forte.
5. Tabela: % de falha e nº de falhas por comprimento mínimo (qualquer, ≥ 0,3, ≥ 0,5, ≥ 1,0 m e o do usuário) e pelas classes 0,5–1 / 1–1,5 / 1,5–2 / 2–3,5 / > 3,5 m, com a classe 0,5–1,0 m marcada "suspeita — conferir em campo"; metros de falha por hectare útil; por talhão quando houver polígonos. Grade hexagonal de % (`native:creategrid` tipo hexágono + `zonal_statistics`) quando pedido.
6. Validação: com referência `falha` nas janelas (`/anotacao falhas`), rode o `/validar-deteccao` (falhas encontradas, precisão, diferença em pontos percentuais, erro por janela). Sem janelas, "não validado" e ofereça o `/janelas-validacao`.
7. Responda com os números no critério do usuário (com o critério escrito e a origem), a tabela por critério, o status de validação, as ressalvas (erro por janela de até ±12 pontos: o % vale para o talhão, não para 10 m; precisão da classe curta; voo tardio) e os caminhos. Outro critério depois: `/resumir-criterio`, sem rodar de novo.

Estimativa de mudas para replantio é informação; replantar é decisão do responsável técnico. O usuário está olhando o QGIS — não capture a tela.
