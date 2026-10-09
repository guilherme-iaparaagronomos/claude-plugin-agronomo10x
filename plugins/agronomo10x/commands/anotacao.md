---
description: Anotação de referência para validar a análise de drone no QGIS — o usuário diz o que anotar (planta/árvore, falha, linha, copa, daninha, área a excluir, outra) e onde (janelas sorteadas, aleatório N, um polígono escolhido, uma camada); cria a camada, esconde o modelo, conduz janela a janela e registra a origem da amostra
argument-hint: "<planta|arvore|falha|linha|copa|daninha|excluir|outra> [janelas | aleatorio N | aqui | camada <nome>] [2 passadas]"
---

Argumentos: $ARGUMENTS

Skill: `drone-validacao` (tabelas de alvos e de onde anotar, campos, protocolo). Com o módulo da ClaudIA QGIS: `cd.avaliador.recorte_referencia` e `registrar_referencia`; sem ele, o caminho abaixo.

1. **Alvo**: sem alvo nos argumentos, pergunte ("o que vamos anotar?"). Cada alvo define a camada `ref_<alvo>`, a geometria e a instrução (tabela da skill).
2. **Onde**: padrão `janelas` = as sorteadas pelo `/janelas-validacao` (crie-as se não existirem); `aleatorio N` sorteia N novas; `aqui` = o usuário desenha ou seleciona um polígono (crie uma camada `amostra_dirigida` em edição e espere o "pronto") — amostra DIRIGIDA; `camada <nome>` = os polígonos de uma camada existente. Diga de saída: "o número do relatório vem das janelas sorteadas; a área escolhida serve para ensinar o alvo e investigar — entra como amostra dirigida".
3. **Modo usuário (padrão)**: crie a camada no GPKG com os campos `janela_id`, `passada`, `classe`, `autor`, `as_cegas`, `amostra`, `marcado_em`, `obs`; `set_layer_style` com símbolo visível (pontos verdes grandes; linhas de falha laranja grossas; polígonos só contorno) e `set_layer_labeling` pela passada; **oculte a camada do resultado do modelo** (`set_layer_visibility false`) — é isso que torna a referência às cegas. Janela a janela: `set_canvas_extent` com margem, `start_editing`, instrução curta ("marque o CENTRO de cada planta com o centro dentro do quadro; planta cortada pela borda só se o centro estiver dentro"), espere o "pronto", `commit_edits`, conte com `get_layer_features` filtrado pela janela e grave no `estado.json`. Progresso: "janela 3 de 8 — 42 plantas".
4. **Segunda passada** (se pedida ou em 20 % das janelas): repita com a primeira passada oculta; concordância pelo pareamento com a tolerância da tarefa (`references/trechos.md`) = o teto do que o modelo pode atingir.
5. **Modo IA** (só quando você consegue ver o recorte — PNG lido da pasta no app desktop/Claude Code, ou tool de imagem na resposta): gere recortes com até 10 objetos, ampliados (lado maior 1.000–1.500 px), régua de 1 m e margem escurecida, numa `execute_code` com matplotlib; responda em pontos "certa/dúvida/copas juntas", sem pistas de espaçamento ou contagem esperada; duas passadas com o recorte deslocado em meia unidade; terceira se discordarem; chame o usuário acima de 15 % de dúvidas. `autor = ia`.
6. **Modo importar**: shapefile de outro software → `add_vector_layer`, copie para `ref_<alvo>` com `autor = externo`.
7. Fim: resumo por janela (objetos, passadas, concordância), avisos (janela com menos de 15 plantas; falha sem início/fim; polígono aberto; anotação dirigida fora das janelas) e o próximo passo: `/validar-deteccao <camada do resultado>`. Referência feita depois de ver o resultado é "assistida" — declare.

As mesmas camadas `ref_*` servem de dataset de treino no futuro. Nada sobre a tecnologia por trás; informação, não recomendação.
