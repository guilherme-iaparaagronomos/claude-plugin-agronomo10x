---
description: Relatório COMPLETO da análise de drone, por desafio (linhas, falhas, contagem, uniformidade, copas, daninhas) — identificação da imagem, método com parâmetros e origem do critério, resultados por talhão e por hectare útil, validação com status e margem, evidências, ressalvas e arquivos; mapas em PDF pelo layout do QGIS
argument-hint: "[desafio: linhas | falhas | contagem | uniformidade | copas | daninhas] [talhão]"
---

Argumentos: $ARGUMENTS

Skill: `drone-relatorio` (o conteúdo por desafio e a montagem). Com o módulo da ClaudIA QGIS: `cd.relatorio.gerar(s, desafio)`; sem ele, o caminho abaixo.

1. Leia o `estado.json` da sessão: análises feitas, critérios e origem, validações com status, janelas, tolerância e margem. Sem status de validação o relatório não sai: escreva "não validado" como status e diga o que falta (`/janelas-validacao`, `/anotacao`, `/validar-deteccao`).
2. Monte o texto em Markdown (`analise_drone/relatorio_<desafio>_<AAAA-MM-DD>.md`) com as seções fixas: **Identificação** (talhões, data do voo, sensor, pixel e GSD das fotos quando conhecido, área total e útil, SRC) · **Método** (caminho seguido, funções e versões, parâmetros, código novo, critério e origem: "usuário" ou "sugestão Stolf 1986, aceita") · **Resultados** (as tabelas do desafio na skill, por talhão e por hectare útil, mais a tabela por critério alternativo quando for falhas) · **Validação** (status, conjunto, janelas, nº de objetos, tipo de referência, tolerância, métricas, intervalo de 95 %, meta usada, sensibilidade à tolerância) · **Evidências** (quais janelas, acertos e erros conferidos) · **Ressalvas** (faixa da imagem, limitações do método, referência visual sem campo, erro por janela, super-resolução se houve) · **Arquivos** (GeoPackage, shapefile/KML, PDFs). Grave também uma cópia `.html` simples do mesmo texto.
3. Mapas no QGIS: `create_checkpoint`; para cada produto do desafio, `create_layout` → `add_layout_map` (extensão do talhão, camadas certas visíveis) → `add_layout_legend` → `add_layout_scalebar` → `add_layout_label` (título, data, status de validação) → `add_layout_table` com a tabela por talhão → `export_layout` em PDF A4 paisagem em `analise_drone/relatorio_<desafio>_<produto>.pdf`. Falhas: inclua a grade hexagonal de % quando existir.
4. Camadas: `export_layer` para shapefile (KML se pedido) de cada camada de resultado.
5. Feche com a frase de capa (ex.: "Falhas: 18,1 % no critério ≥ 0,5 m (do usuário). Motor validado às cegas em 4 janelas: 85 % das falhas encontradas, −2,0 pontos. Vale para o talhão; por trecho, o erro chega a ±12 pontos.") e os caminhos de tudo. No chat do navegador, entregue o texto do relatório na resposta.

Estimativas de replantio e de perda são informação; a decisão é do responsável técnico. Nada sobre a tecnologia por trás do processamento. O usuário está olhando o QGIS — o PDF é a evidência, não a captura da tela.
