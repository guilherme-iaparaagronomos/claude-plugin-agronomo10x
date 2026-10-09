# agrônomo10X — plugin do Claude

Reúne, numa instalação só, os quatro conectores da comunidade [agrônomo10X](https://comunidade.agronomos.ia.br)
(powered by OagronomIA) e as skills que ensinam o Claude a combiná-los:

- **Comunidade 10X** — aulas, lives, trilhas, fórum, eventos, vagas, mentorias, ferramentas de IA e o
  catálogo de skills, com trecho e minuto da fonte.
- **ClaudIA Sat** — imagens do satélite Sentinel-2 (RGB, NDVI, NDRE), composto, curva temporal, laudo em
  PDF e o mapa dos talhões das fazendas salvas na conta.
- **ClaudIA Clima** — clima agora, histórico de chuva desde 1998 comparado com a média 1991–2020, previsão de
  7 dias e janela de pulverização, pelas mesmas fazendas salvas, por um perímetro ou por um ponto.
- **ClaudIA QGIS** — opera o QGIS aberto no seu computador pelo plugin ClaudIA QGIS: camadas, estilos,
  processamento, layouts, checkpoints.

## Como usar

1. Instale o plugin pelo marketplace `guilherme-iaparaagronomos/claude-plugin-agronomo10x` (claude.ai e app
   desktop: Customize › Plugins › Add › Add marketplace; Claude Code: `/plugin marketplace add` e
   `/plugin install agronomo10x@agronomo10x`) e, na aba **Connectors**, conecte cada conector com a sua conta
   da comunidade (no Claude Code, `/mcp` → autenticar). Os conectores fazem parte do plano Pro; a ClaudIA QGIS
   tem 30 dias de teste para contas gratuitas.
2. Peça em linguagem natural: *"NDVI da Fazenda 2 aberto no QGIS"*, *"laudo da Santa Rita"*,
   *"tem aula sobre krigagem?"*, *"vai chover na fazenda esta semana?"*. As skills escolhem o conector certo
   e, quando o Claude tem acesso a pastas (app desktop e Claude Code), salvam os arquivos gerados e os abrem no QGIS.
3. Comandos de atalho: `/agronomo10x:ndvi`, `/agronomo10x:laudo`, `/agronomo10x:clima`, `/agronomo10x:aula` (no chat do claude.ai
   eles funcionam como skills).

## Dados

O plugin é só texto (Markdown e JSON) e não guarda credencial nenhuma. Cada conector fala com os servidores
da comunidade em `comunidade.agronomos.ia.br`, autenticado pelo login da sua conta, e envia apenas o que você
pede: o nome da fazenda salva ou um perímetro, as datas, a pergunta sobre o conteúdo, os comandos para o seu QGIS.
As imagens e os PDFs gerados ficam disponíveis por links de 1 hora. Nenhum dado vai para outro serviço.
