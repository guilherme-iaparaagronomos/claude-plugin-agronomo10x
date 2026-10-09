---
description: Boletim de uma página de uma fazenda (ou talhão) salva na comunidade — cena mais recente da ClaudIA Sat, tendência de 60 dias, chuva de 30 dias contra a média, previsão de 7 dias e janelas de pulverização de 48 h da ClaudIA Clima
argument-hint: "<fazenda> [talhão]"
---

Argumentos: $ARGUMENTS

Conector de clima: `claudia-clima`; se ele não existir na instalação (a ClaudIA Clima ainda não foi lançada), as mesmas ferramentas de clima estão no conector `claudia-sat` — use-as de lá, sem tratar como erro.

1. Sem fazenda nos argumentos, chame `listar_fazendas` (conector `claudia-sat`) e pergunte qual. Com talhão citado, passe `talhao` em todas as chamadas de satélite.
2. Chamadas, nesta ordem:
   - `claudia-sat` → `imagem_satelite` com `fazenda`, `produtos: ["ndvi"]`, `dias_janela: 30`. Sem cena no % de nuvem padrão, mostre as candidatas e pergunte antes de seguir.
   - `claudia-sat` → `curva_indice` com `fazenda`, `indice: "ndvi"`, últimos 60 dias, `todos_talhoes: true`.
   - `claudia-clima` → `clima_historico` com `fazenda`, últimos 30 dias, `comparar_media: true`.
   - `claudia-clima` → `previsao_tempo` com `fazenda`, `dias: 7`.
   - `claudia-clima` → `janela_pulverizacao` com `fazenda`, `horas: 48`.
3. Monte o boletim em SEIS blocos, com títulos curtos e no máximo ~25 linhas:
   - **Cena mais recente** — data, % livre de nuvem, NDVI médio, mínimo e máximo; talhões abaixo da média da fazenda.
   - **Tendência (60 dias)** — subida, platô ou queda; talhões com queda de 0,10 ou mais em duas cenas seguidas ("a investigar").
   - **Chuva (30 dias)** — acumulado, % contra a normal, dias de chuva, maior veranico com datas.
   - **Próximos 7 dias** — chuva prevista por dia e acumulado; temperatura; do 4º dia em diante como tendência.
   - **Janelas de pulverização (48 h)** — as ideais mais longas, pelos parâmetros da ferramenta.
   - **Ressalvas** — as que valerem: nuvem/sombra, pixel de 10 m em talhão pequeno, saturação, coincidência (não causa) entre queda e clima.
4. Siga as skills `leitura-satelite` e `clima-na-fazenda` para o texto. Quando você tem acesso a pastas, salve `agronomo10x/<fazenda>/boletim_<AAAA-MM-DD>.md` e informe o caminho; no chat, só o texto e os links (valem 1 hora).
5. Custo: as duas chamadas de satélite na mesma fazenda dentro de 6 horas cobram a área uma vez; as três de clima entram na franquia mensal.

Leitura do dado, não recomendação de manejo. Só números que as ferramentas devolveram. Nada sobre a tecnologia por trás do processamento.
