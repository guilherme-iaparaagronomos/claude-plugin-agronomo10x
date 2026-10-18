---
name: drone-imagem
description: "Resolução, GSD e qualidade do ortomosaico de drone para cada tarefa (faixas por cultura e estádio, hora do voo, sobreposição, RGB e multiespectral, DSM e CHM), pixel exportado contra o GSD das fotos, super-resolução só para visualizar. Use para \"dá para contar ou medir com esta imagem?\", \"qual altura de voo\", \"melhorar a resolução\", \"a imagem está ruim\", e ao avaliar a adequação antes de uma análise."
---

<!-- GERADO por scripts/gera-drone.mjs a partir do playbook analise-drone-qgis (skills-agro, versão cc3fc248) + scripts/drone-extras/. Não edite à mão: corrija a fonte e gere de novo. -->

# ClaudIA Drone — imagem, resolução e voo

## Regras

1. **Meça a imagem antes de prometer**: pixel (GSD), SRC, bandas e alfa com `get_raster_info`; cobertura vegetal, contraste planta–solo, dossel aberto ou fechado, sombra e nitidez em 3–5 blocos de 20 m (o `/cena-drone` faz isso).
2. **Pixel de exatamente 5,0 cm pode ser o padrão do software de fotogrametria** (OpenDroneMap e ODX), não o GSD das fotos: pergunte pelo `odm_report/stats.json` (campo `average_gsd`). Se as fotos forem bem mais finas, reprocessar o ortomosaico perto do GSD (`--orthophoto-resolution`) é o único ganho real de resolução.
3. **Super-resolução por IA nunca entra na medição.** Na Promisso o % de falha mudou de −3,8 a +2,2 pontos conforme o modelo; ampliar (bicúbica), afiar e deconvoluir não mudaram nada. Só para visualizar, sempre marcada "imagem melhorada por IA — não usar para medir".
4. **Fora das faixas conhecidas, avise a expectativa e siga**: a biblioteca e as skills não bloqueiam por limite presumido; os limites vêm dos casos validados.
5. **SRC em metros** (UTM / SIRGAS 2000). Em EPSG:3857 distâncias e áreas saem infladas por 1/cos(latitude): ~8 % a 23° S.
6. **Alfa** (banda 4) é a máscara de pixels válidos; pixel com alfa 0 ou r + g + b = 0 é inválido.

## Faixas de partida por tarefa (hipóteses da literatura e dos nossos casos — avisam, não bloqueiam)

| Tarefa | Pixel indicado | Estádio e voo | Observações |
|---|---|---|---|
| Contar milho e soja jovens | ≤ 1 cm (de preferência ≤ 0,5 cm); 1,5 cm a 26 m ainda serviu em V2–V4 | milho V2–V4 (pior em V1 e em V4+ por sobreposição); soja V1–V3, 14–20 dias após a emergência; piora depois de ~27 dias | linhas retas, sem linha dupla, pouca palhada; a 3–5 cm avise expectativa baixa e meça |
| Falhas de cana | ~1,4 cm com detector treinado; 3,5 cm a 80 m com planta de 0,5 m; na Promisso 5 e 10 cm deram o mesmo | 30–60 dias após o corte (planta de 0,5 a 1,2 m), antes de fechar; voo tardio piora | vãos de 0,5–1,0 m são a classe "suspeita"; só acima de 1,5 m são confiáveis em RGB comum |
| Linhas de cana | 3–4,5 cm | cana com 0,9–1,2 m | linhas curvas pedem rastreamento |
| Árvores e pomares | 5–10 cm; citros a 3,6 cm; café RGB na floração | café: conta bem aos 3–6 meses, aos 12 as copas se fundem | altura (DSM − DTM) ajuda em copas encostadas |
| Daninhas isoladas | ~1 cm; manchas grandes toleram pixel maior | antes do fechamento do dossel | NIR e red-edge ajudam muito; daninha na linha com a mesma cor exige forma/textura ou modelo |
| Parcelas de experimento | 0,8–1,6 cm basta | — | — |

Voo: meio-dia solar ± 2 h (sombra mínima; dia nublado dá luz difusa); sobreposição 70–80 % frontal e 65–80 % lateral; RGB resolve linhas, falhas e contagem; multiespectral soma pouco em falhas e muito em daninhas. **DSM/CHM**: se a fotogrametria entregou o modelo de superfície, o CHM = DSM − DTM (`native:rastercalc`) separa copas encostadas e dá altura média — pergunte se existe.

## Como responder "dá para fazer com esta imagem?"

Diga em que faixa a imagem está para a tarefa, o que esperar (acurácia observada em casos parecidos, quando houver), o motivo quando estiver fora (pixel, dossel fechado, borrão, costuras, sombra) e a recomendação de voo para a próxima vez — e ofereça rodar mesmo assim, medindo nas janelas. Com o módulo da ClaudIA QGIS (versão 1), `cd.cena.adequacao(s, tarefa)` faz essa conta.

---
Fonte do método: playbook `analise-drone-qgis` da comunidade agrônomo10X (skills-agro, MIT; versão cc3fc248). Sigilo, informação (não recomendação) e as regras dos conectores: skill `roteamento-agronomo10x`.
