---
name: drone-relatorio
description: "Relatório da análise de drone para o cliente: o completo por desafio (identificação, método, resultados por talhão e por hectare útil, validação, evidências, ressalvas, arquivos) e o de uma página, com a frase de capa e a regra de informação, não recomendação. Use para \"relatório\", \"laudo do drone\", \"resumo para o cliente\", \"exportar\", e ao fechar uma análise."
---

<!-- GERADO por scripts/gera-drone.mjs a partir do playbook analise-drone-qgis (skills-agro, versão b133424b) + scripts/drone-extras/. Não edite à mão: corrija a fonte e gere de novo. -->

# ClaudIA Drone — relatório

## 8. Entrega

Para cada desafio, por talhão:
- **Números:** com a unidade e por hectare útil.
- **Critério:** qual foi e de onde veio ("usuário" ou "sugestão Stolf 1986, aceita").
- **Validação:**
    - status;
    - janelas;
    - número de objetos;
    - tipo de referência;
    - tolerância;
    - métricas;
    - margem de 95%.
- **Ressalvas:**
    - imagem;
    - época do voo;
    - erro por janela;
    - referência visual, sem conferência de campo.
- **Camadas:** onde ficaram no GPKG.

Exemplo de frase: "Falhas: 18,1% no critério ≥ 0,5 m (do usuário). Motor validado às cegas em 4 janelas: 85% das falhas encontradas, −2,0 pp. Vale para o talhão; por trecho, o erro chega a ±12 pp."

## Dois relatórios

| | `/relatorio-drone` (completo) | `/relatorio-1pagina` |
|---|---|---|
| Para quem | o técnico que confere e guarda | o cliente que decide |
| Tamanho | o que o desafio pedir (5–15 páginas com mapas) | uma página A4 |
| Identificação | talhões, data do voo, sensor, pixel e GSD das fotos, área total e útil, SRC | fazenda/talhão, data do voo, pixel, área útil |
| Método | caminho, funções e versões, parâmetros, código novo, critério e origem | uma linha |
| Resultados | as tabelas do desafio (abaixo), por talhão e por hectare útil, mais a tabela por critério alternativo | 3–5 números em destaque |
| Mapas | um por produto, mais a grade hexagonal de % quando houver | um mapa |
| Validação | status, janelas, objetos, referência, tolerância, métricas com IC 95 %, meta, sensibilidade à tolerância | duas linhas |
| Evidências | recortes com acertos e erros | nenhum |
| Ressalvas | todas | as três principais |
| Arquivos | GeoPackage, shapefile/KML, PDF dos mapas, `.md`/`.html` | PDF A4 (+ `.md`) |

Sem status de validação o relatório não sai: ele diz qual é ("não validado" é um status).

## O que muda por desafio

| Desafio | Tabelas e números | Mapas |
|---|---|---|
| Linhas | nº de linhas, km, espaçamento (média, p10–p90), desvio do ideal, paralelismo, cobertura | linhas sobre a imagem; desvio |
| Falhas | % no critério do usuário (com o critério escrito), % nos outros comprimentos mínimos e nas classes 0,5–1 / 1–1,5 / 1,5–2 / 2–3,5 / > 3,5 m (0,5–1,0 "suspeita"), classe na escala escolhida, metros por hectare, mudas estimadas (informação) | falhas com classe; grade hexagonal de % e classe; prioridade por linha |
| Contagem | plantas totais, por hectare útil e por metro; real × esperada e % de emergência (grãos); faltantes com coordenadas (perenes); árvores/ha e sobrevivência (florestal) | pontos; densidade por célula; faltantes |
| Uniformidade | CV, % aceitável / falho (> 1,5×) / duplo (< 0,5×), classe com os limites declarados | espaçamento por trecho |
| Copas | nº, área (média, mediana, p10–p90), diâmetro, cobertura %, classes de tamanho, vigor por copa | polígonos por classe |
| Daninhas | área infestada (ha e %), nº e tamanho das manchas, zonas de aplicação (sem produto nem dose) | manchas; grade de zonas |

O `/relatorio-1pagina` escolhe, em cada desafio, os 3–5 números da coluna do meio que o cliente usa para decidir (falhas: % no critério, metros/ha, classe, mudas estimadas; contagem: plantas/ha útil, % de emergência, faltantes).

## Como montar (versão 0, sem o módulo)

1. Texto: escreva o relatório em Markdown na pasta de trabalho (`analise_drone/relatorio_<desafio>_<data>.md`) e uma cópia `.html` simples (mesmo conteúdo, para abrir no navegador e imprimir em PDF). No chat do navegador, entregue o texto na resposta.
2. Mapas: no QGIS, `create_checkpoint`; `create_layout` ("Relatório <desafio>"), `add_layout_map` com a extensão do talhão e as camadas certas visíveis, `add_layout_legend`, `add_layout_scalebar`, `add_layout_label` (título, data, status de validação, frase de capa) e, no completo, `add_layout_table` com a tabela por talhão; `export_layout` em PDF (A4 paisagem para o mapa; A4 retrato para a página única). Um layout por mapa no completo; um só no `/relatorio-1pagina`.
3. Camadas: `export_layer` para shapefile (e KML quando pedido) na pasta de trabalho.
4. Frase de capa (exemplo): "Falhas: 18,1 % no critério ≥ 0,5 m (do usuário). Motor validado às cegas em 4 janelas: 85 % das falhas encontradas, −2,0 pontos. Vale para o talhão; por trecho, o erro chega a ±12 pontos."

Com o módulo (versão 1): `cd.relatorio.gerar(s, desafio)` e `cd.relatorio.resumir(s, resultado, criterio)`.

---
Fonte do método: playbook `analise-drone-qgis` da comunidade agrônomo10X (skills-agro, MIT; versão b133424b). Sigilo, informação (não recomendação) e as regras dos conectores: skill `roteamento-agronomo10x`.
