---
name: satelite-no-qgis
description: Leva uma imagem da ClaudIA Geo (NDVI, NDRE ou RGB do Sentinel-2, composto por período) para dentro do QGIS aberto no computador do usuário, pela ClaudIA QGIS, já com estilo. Use quando o usuário pedir satélite "no QGIS", "abrir a imagem no projeto", "camada NDVI da fazenda", ou quando ele tiver pedido uma imagem à Geo e a ClaudIA QGIS estiver conectada.
---

# Satélite da Geo no QGIS

Dois conectores, nesta ordem: `claudia-geo` gera o arquivo e devolve um link de 1 hora; `claudia-qgis` baixa o arquivo na máquina do usuário, adiciona a camada e aplica o estilo. Nunca prometa imagem na resposta: o resultado aparece no QGIS dele.

## Passos

1. **QGIS conectado?** `claudia-qgis` → `ping`. Sem resposta: oriente a abrir o QGIS, ativar o plugin ClaudIA QGIS e conectar com o token de `https://comunidade.agronomos.ia.br/solucoes/mcp/claudia-qgis`. Pare aqui até conectar.
2. **Qual fazenda?** `claudia-geo` → `listar_fazendas`. Se o usuário citou um nome, case com a lista (sem acento e sem diferença de caixa); se citou um talhão, confira em `listar_talhoes`. Perímetro colado: use `geometria` na primeira chamada e o `geometria_id` nas seguintes.
3. **Gere a imagem** com `imagem_satelite`: `fazenda` (ou `geometria`), `produtos` (`["ndvi"]` por padrão; `["rgb"]`, `["ndre"]` ou mais de um quando pedido), `dias_janela` 30 ou `data_inicio`/`data_fim` quando o usuário deu período, `talhao` quando for um talhão. A resposta traz a data da cena, o % livre de nuvem, estatísticas e um link por produto. Sem cena no % pedido, a Geo lista candidatas: pergunte se aceita uma com mais nuvem antes de repetir.
   - Composto de período: `composto_indice` (`indice`, `operacao` mediana por padrão, `data_inicio`, `data_fim`).
   - Laudo: `laudo_pdf`. PDF não vira camada: só baixe e informe o caminho.
4. **Leve o arquivo para a máquina do usuário.** Escolha pela sua situação:
   - **Pelo próprio QGIS** (funciona em qualquer app, inclusive no chat do navegador): `execute_code` com um código curto que baixa o link para uma pasta do usuário e imprime o caminho. Mostre o código e confirme antes (regra do conector). Pasta padrão `~/agronomo10x/<fazenda>/<AAAA-MM-DD>/`; nome do arquivo `<fazenda>_<produto>_<data>.tif`, sem acentos nem espaços.

     ```python
     import os, urllib.request
     url = "COLE_O_LINK"
     pasta = os.path.join(os.path.expanduser("~"), "agronomo10x", "FAZENDA", "AAAA-MM-DD")
     os.makedirs(pasta, exist_ok=True)
     caminho = os.path.join(pasta, "FAZENDA_ndvi_AAAA-MM-DD.tif")
     urllib.request.urlretrieve(url, caminho)
     print(caminho, os.path.getsize(caminho))
     ```
   - **Quando você mesmo tem acesso a pastas** (app desktop e Claude Code): baixe o link com as suas ferramentas, salve na mesma estrutura e use o caminho local.
5. **Adicione a camada:** `add_raster_layer` com `path` = o caminho impresso e `name` = "<Fazenda> NDVI <data>". Se o projeto já tem camadas, faça `create_checkpoint` antes e diga que dá para voltar com `restore_checkpoint`.
6. **Estilo:** `set_raster_style` na camada nova.
   - NDVI ou NDRE: `style_type` `singleband_pseudocolor`, banda 1, `color_ramp` `RdYlGn`, `classification` `continuous`, `interpolation` `interpolated`; `min_value` e `max_value` pelas estatísticas que a Geo devolveu (em dossel costuma ficar entre 0,2 e 0,9); sem estatísticas, 0 a 1.
   - RGB: `style_type` `multiband_color` com `red_band` 1, `green_band` 2, `blue_band` 3 e `contrast` `stretch`.
7. `zoom_to_layer` e responda em texto: fazenda, produto, data da cena, % livre de nuvem, média do índice e o caminho salvo. Não renderize nem capture a tela para "mostrar": o usuário está vendo o QGIS.

## Cuidados

- Link vencido (1 hora) dá erro no download: gere a imagem de novo.
- Um produto por camada. Vários talhões: um pedido por talhão, ou a fazenda inteira.
- Sigilo: as imagens são do Sentinel-2 processadas pela comunidade agrônomo10X; nada sobre a tecnologia por trás.
- Leitura, não prescrição: descreva as faixas do índice e onde está mais baixo; dose, produto e manejo ficam com o responsável técnico.
