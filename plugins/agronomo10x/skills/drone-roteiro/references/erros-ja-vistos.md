<!-- GERADO por scripts/gera-drone.mjs a partir do playbook analise-drone-qgis (skills-agro, versão b133424b) + scripts/drone-extras/. Não edite à mão: corrija a fonte e gere de novo. -->

# 6. Erros que já aconteceram e como evitar

| Erro | O que aconteceu | Como evitar |
|---|---|---|
| Camada vazia sem erro | A camada temporária rejeitou valores numpy (`np.float64`, `np.int64`) em silêncio | Converter com `float()`/`int()` antes de `setAttributes`; conferir `featureCount()` depois de gravar |
| Camadas sumindo | Camadas temporárias somem ao fechar o QGIS | Gravar sempre no GPKG da pasta de trabalho |
| Código perdido | Uma função de avaliação se perdeu quando a conversa foi resumida; os resultados estavam em variáveis escondidas | Funções em `funcoes_drone.py`; resultados e parâmetros em disco (GPKG, JSON) |
| Chamada cortada | Limite de ~60 s por chamada | Testar num bloco, medir, rodar em lotes de até ~40 s, gravando o parcial |
| Presença zerada | Um índice de bloco estourou o limite do raster e devolveu zeros sem erro | Recortar a janela aos limites do raster; `assert` no formato do array; conferir a fração de zeros e NaN |
| Métrica errada | Erro de contabilidade (o mesmo objeto contado duas vezes) | Pareamento um a um; conferir TP + FN = referência e TP + FP = detectado |
| Referência com linha vazia | Uma fileira da referência veio como `None` e quebrou a conta | Validar a referência antes de avaliar; pular e contar as linhas sem referência |
| Biblioteca ausente | O QGIS não tinha scikit-image nem OpenCV | Usar numpy/scipy (Otsu próprio, `maximum_filter`, `watershed_ift`); nada de `pip install` no Python do QGIS |
| Referência viesada | A primeira contagem do pomar deu 91 plantas; eram 56 (copas grandes divididas em duas) | Diagnosticar o espaçamento antes; contar às cegas, sem pistas, pela fileira desenrolada, em duas passadas |
| Métrica otimista | Janela pequena usada no ajuste: 99% no miolo × 86% no anel | Ajuste separado do teste; métrica só no que nunca foi usado para ajustar |
| F1 que muda sozinho | F1 de 80% a 95% só mudando a tolerância de 0,6 para 1,0 m | Declarar a tolerância; reportar também com 0,5×, 0,75× e 1,0× |
| Falhas subestimadas | O método por pixel deu 4,2% contra 9,1% da leitura visual: folha vizinha cobrindo o vão | Motor v3 (plantas + solo exposto + limiar local) |
| Receita que não transfere | O limiar fixo da 1ª área achou 47% das falhas na 2ª | Limiar local por trecho de ~25 m |
| Teto de parâmetros | 168 combinações e o erro parou em −4 pp | Mudar o método, não só os números |
| SAM automático inútil | 12 máscaras para 42 plantas, em 351 s | Um ponto por planta + refinos |
| Filtro de mato por cor | Removeu plantas verdadeiras | Forma + posição fora da linha + conferência visual |
| Super-resolução mudando o resultado | O % de falha mudou de −3,8 a +2,2 pp conforme o modelo | Medir só na imagem original ou num ortomosaico reprocessado no GSD das fotos |
| Imagem que a IA não vê | `render_map` e capturas devolvem um link de 1 hora | Ler PNG da pasta pela ponte de arquivos, pedir anexo, ou o usuário marcar no QGIS |
| Distâncias erradas | EPSG:3857 infla distâncias por 1/cos(latitude) | Trabalhar em UTM |
