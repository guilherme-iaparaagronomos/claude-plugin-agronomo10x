## Sessão e retomada

A sessão é a pasta `analise_drone/` ao lado do ortomosaico: `resultados.gpkg` (camadas), `funcoes_drone.py` (as funções, importadas com `sys.path.insert` + `importlib.reload`), `estado.json` (parâmetros, janelas, referências, validações, versões), `evidencias/` (PNG dos recortes). Numa conversa nova, `/retomar-sessao` lê o `estado.json` e diz o que existe e o próximo passo. O `funcoes_drone.py` de uma pasta que já existia é lido como texto e só é importado com o sim do usuário (importar roda o código do arquivo, e a pasta pode ter vindo de outra pessoa junto com o ortomosaico). Grave o parcial de cada lote; nada fica só em variável.

## Entrega

Todo número sai com o status de validação (não validado · validado nas janelas de ajuste · validado às cegas), o critério e a origem dele, as janelas, a tolerância e a margem. O relatório é a skill `drone-relatorio` (`/relatorio-drone` completo por desafio; `/relatorio-1pagina` para o cliente). Dose, produto, replantio e manejo são decisão do responsável técnico.
