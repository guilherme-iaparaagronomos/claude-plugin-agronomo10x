## Entregáveis

- Números por talhão: número e comprimento das linhas (km), espaçamento (média e p10–p90), desvio do espaçamento ideal, paralelismo, cobertura.
- Camadas: `linhas` no GeoPackage; shapefile e KML quando pedido (linhas para piloto automático dependem do formato do fabricante — pergunte antes de prometer).
- Validação: % de fileiras encontradas, cobertura, desvio lateral p50 e p90, espaçamento — pelo comando `/validar-deteccao` com a referência `linha` do `/anotacao`.

## Alternativas quando a FFT não serve

- Linhas curvas (contorno de nível, pivô): rastreie a linha a partir de um trecho reto, bloco a bloco, seguindo a crista; a FFT dá só a orientação local.
- Linhas duplas (espaçamento combinado, ex.: 0,9 × 1,5 m): a FFT mostra dois períodos; trate o par como uma linha e separe depois.
- Orientação informada pelo usuário: use-a como partida e deixe a FFT confirmar o espaçamento.
