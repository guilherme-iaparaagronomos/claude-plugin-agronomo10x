## Como esta skill funciona dentro do plugin

Você conduz a análise no QGIS do usuário pela ClaudIA QGIS (conector `claudia-qgis`). O usuário está olhando a tela do QGIS: não capture nem renderize para se orientar ou para "mostrar como ficou". A única exceção é EVIDÊNCIA de validação (recortes de janelas para conferir ou anotar), quando uma skill de drone estiver conduzindo.

**Duas versões, um só roteiro.** Antes de qualquer análise, confira se o módulo de drone da ClaudIA QGIS existe:

```python
# execute_code
try:
    from claudia_qgis import drone as cd
    print("modulo", cd.__version__ if hasattr(cd, "__version__") else "ok"); print(cd.ambiente.status())
except Exception as e:
    print("sem modulo:", type(e).__name__)
```

- **Com o módulo** (versão 1): use `cd.sessao.abrir(...)`, `cd.cena.analisar(...)`, as receitas (`cd.receitas.*`), o avaliador (`cd.avaliador.*`) e `cd.relatorio.*`. Leia o campo `avisos` de todo retorno e trate antes de seguir; tarefas longas vão pelos algoritmos `claudia_drone:*` em `start_processing_job`.
- **Sem o módulo** (versão 0, a de hoje): siga o caminho clássico desta skill e das skills irmãs, escrevendo o código em `execute_code` com o que o Python do QGIS tem (numpy, scipy, GDAL; pandas, shapely, matplotlib e PIL costumam existir no Windows; scikit-learn às vezes; scikit-image e OpenCV não — nunca `pip install`). O comando `/preparar-ambiente` confere o que há.

**Os comandos do plugin** são atalhos deste roteiro: `/cena-drone` (perfil e adequação), `/linhas-plantio`, `/falhas-plantio`, `/contar-plantas`, `/janelas-validacao`, `/anotacao`, `/validar-deteccao`, `/resumir-criterio`, `/relatorio-drone`, `/relatorio-1pagina`, `/retomar-sessao`, `/preparar-ambiente`, `/segmentar`, `/daninhas`, `/uniformidade-estande`, `/faltantes`. Quando o usuário pede em linguagem natural, siga o comando que combina.

**Entrega por app.** Resultados ficam no GeoPackage e na pasta de trabalho na máquina do usuário; a resposta no chat traz números, status de validação e caminhos. Quando você tem acesso a pastas (app desktop, Claude Code), pode ler os PNG de evidência da pasta de trabalho; no chat do navegador, não.
