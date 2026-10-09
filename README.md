# claude-plugin-agronomo10x

Marketplace de plugins do Claude da comunidade [agrônomo10X](https://comunidade.agronomos.ia.br)
(powered by OagronomIA). Tem um plugin, **`agronomo10x`**, que reúne os conectores da comunidade — Comunidade 10X
(aulas, lives, fórum, mentorias, skills), ClaudIA Geo (satélite e clima da fazenda) e ClaudIA QGIS (opera o seu
QGIS) — e as skills que ensinam o Claude a usá-los juntos.

O plugin é só texto (Markdown e JSON). Não contém credencial, chave ou segredo: cada conector pede o login da
sua conta na comunidade, e é o servidor da comunidade que confere o plano a cada pedido. Os conectores fazem
parte do plano Pro; a ClaudIA QGIS tem um período de teste para contas gratuitas.

## Instalar

**claude.ai e app desktop** — Customize › Plugins › Add › **Add marketplace** e cole:

```
guilherme-iaparaagronomos/claude-plugin-agronomo10x
```

Depois instale o plugin `agronomo10x` e, na aba **Connectors**, conecte cada conector com a sua conta da
comunidade. O plugin exige um plano pago do Claude (Pro, Max, Team ou Enterprise).

**Claude Code**:

```
/plugin marketplace add guilherme-iaparaagronomos/claude-plugin-agronomo10x
/plugin install agronomo10x@agronomo10x
/mcp          # autenticar os conectores
```

Alternativa sem marketplace: `node scripts/gera.mjs --zip` gera `dist/agronomo10x-<versão>.zip` para
Customize › Plugins › Add › Upload plugin.

## O que vem

```
.claude-plugin/marketplace.json   lista os plugins deste marketplace
plugins/agronomo10x/              o plugin
  .claude-plugin/plugin.json
  .mcp.json                       os conectores, por URL (servidores da comunidade)
  skills/roteamento-agronomo10x   qual conector para cada pedido, regras e entrega por app
  skills/satelite-no-qgis         imagem da Geo aberta e estilizada no QGIS
  skills/do-conteudo-a-pratica    aula ou skill → passo reproduzido na Sat ou no QGIS
  skills/leitura-satelite, clima-na-fazenda, zonas-de-manejo-qgis   como ler, narrar e fazer zonas no QGIS
  skills/drone-*                  as 8 skills da ClaudIA Drone (GERADAS por scripts/gera-drone.mjs)
  commands/                       29 atalhos: fazenda, datas, ndvi, laudo, curva, chuva, clima, pulverizar, boletim,
                                  comparar, zonas, no-qgis, aula e os 16 de drone (cena-drone … faltantes)
  evals/                          casos para `claude plugin eval`
  README.md, LICENSE
scripts/gera.mjs                  gera dist/dev (conectores num servidor de dev), dist/prod e o zip (--sem-clima = zip para a produção sem o Clima)
scripts/gera-drone.mjs            reparte o playbook público analise-drone-qgis (skills-agro) nas 8 skills de drone + scripts/drone-extras/
```

## Desenvolver

```
node scripts/gera.mjs --base http://localhost:3000   # dist/dev apontando para um servidor de dev da comunidade
claude --plugin-dir ./dist/dev/agronomo10x
claude plugin validate ./plugins/agronomo10x
```

Pedidos, dúvidas e sugestões de skill: pelo suporte da comunidade ou pelas issues deste repositório.

## Licença

MIT — veja [LICENSE](LICENSE). Os conectores e o conteúdo da comunidade seguem os
[Termos de Uso](https://comunidade.agronomos.ia.br/termos-uso) e a
[Política de Privacidade](https://comunidade.agronomos.ia.br/politica-privacidade) da plataforma.
