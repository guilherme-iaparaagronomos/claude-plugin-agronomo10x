---
name: drone-linhas
description: "Restituição de linhas de plantio em ortomosaico de drone (FFT por bloco, cristas, união de segmentos; alternativas para linhas curvas e duplas), com validação e critérios. Use para \"linhas de plantio\", \"fileiras\", \"espaçamento entre linhas\", \"desvio das linhas\", e antes de falhas ou contagem na fileira."
---

<!-- GERADO por scripts/gera-drone.mjs a partir do playbook analise-drone-qgis (skills-agro, versão cc3fc248) + scripts/drone-extras/. Não edite à mão: corrija a fonte e gere de novo. -->

# ClaudIA Drone — restituição de linhas

## 1. Restituição de linhas

**Caminho (validado em duas áreas de cana, a 4 e 5 cm)**
1. ExG reamostrado a ~8 cm (média, não vizinho mais próximo), em blocos de 20 m com 4 m de sobreposição.
2. **Em cada bloco, FFT 2D** do ExG, menos a média e com janela de Hann.
    - Procure o pico na faixa de período de 0,8–1,2× o espaçamento nominal (1,2–1,8 m para 1,5 m).
    - O vetor do pico dá a perpendicular às linhas; o período dá o espaçamento.
    - Se houver um segundo pico forte com outra orientação, é uma divisa entre blocos de plantio: trate as duas.
3. **Linhas do bloco.**
    - **Versão validada:** demodulação complexa (sinal analítico) na frequência achada. Suavize 1,5 m ao longo e 2,5 m através da fileira. A linha é a crista (fase zero), mantida onde a amplitude é suficiente.
    - **Versão rápida, para aula:** projete os pixels na direção perpendicular, faça o perfil médio e use os picos (distância mínima de 0,6× o espaçamento) como centros das fileiras. Valide nas janelas antes de usar.
4. **Use só o miolo de cada bloco** (descarte os 2 m de cada borda) para não duplicar linhas na sobreposição.
5. **Una os segmentos de blocos vizinhos** quando as pontas estiverem a até 0,35 m e o ângulo for menor que 30°.
6. **Grave no GPKG** com os campos `id`, `comprimento_m` e `bloco_orientacao`.

**Validação.** Janelas com 6 fileiras ou mais. Meça:
- % de fileiras encontradas;
- cobertura (comprimento detectado ÷ área válida ÷ espaçamento);
- espaçamento entre vizinhas (p10, mediana, p90);
- desvio lateral: o pico do perfil perpendicular deve cair a ~0 m da linha.

**Critério inicial:**
- espaçamento mediano a ±3% do nominal;
- cobertura de pelo menos 97%;
- desvio p90 de no máximo ⅕ do espaçamento.

**Resultado de referência:**
- **Cana a 4 cm:** 114 linhas e 32,4 km; mediana de 1,50 m; desvio p90 de 0,20–0,28 m.
- **Promisso a 5 cm:** a mesma receita, sem ajuste, deu 100% das fileiras e desvio p90 de 13,9 cm.

**Onde falha:**
- divisa entre blocos;
- bordas: linha extra em sulco sem cana emergida e trecho inicial sem linha;
- linhas curvas: a FFT serve para retas; para curvas, rastreie a linha.

## Entregáveis

- Números por talhão: número e comprimento das linhas (km), espaçamento (média e p10–p90), desvio do espaçamento ideal, paralelismo, cobertura.
- Camadas: `linhas` no GeoPackage; shapefile e KML quando pedido (linhas para piloto automático dependem do formato do fabricante — pergunte antes de prometer).
- Validação: % de fileiras encontradas, cobertura, desvio lateral p50 e p90, espaçamento — pelo comando `/validar-deteccao` com a referência `linha` do `/anotacao`.

## Alternativas quando a FFT não serve

- Linhas curvas (contorno de nível, pivô): rastreie a linha a partir de um trecho reto, bloco a bloco, seguindo a crista; a FFT dá só a orientação local.
- Linhas duplas (espaçamento combinado, ex.: 0,9 × 1,5 m): a FFT mostra dois períodos; trate o par como uma linha e separe depois.
- Orientação informada pelo usuário: use-a como partida e deixe a FFT confirmar o espaçamento.

## Referências desta skill

- `references/trechos.md`

---
Fonte do método: playbook `analise-drone-qgis` da comunidade agrônomo10X (skills-agro, MIT; versão cc3fc248). Sigilo, informação (não recomendação) e as regras dos conectores: skill `roteamento-agronomo10x`.
