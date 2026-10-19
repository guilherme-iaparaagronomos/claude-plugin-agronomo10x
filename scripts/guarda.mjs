// O PORTÃO DO MARKETPLACE (18/10/2026). Roda em todo push e pull request (.github/workflows/guarda.yml) e também
// à mão: `node scripts/guarda.mjs`.
//
// Este repositório É o marketplace do Claude: um commit no main muda o plugin de todos os membros que o instalaram.
// O plugin, por desenho, é só TEXTO (comandos e skills em Markdown) mais os quatro conectores HTTP da comunidade —
// nada que rode na máquina do membro. O portão falha quando um commit sai disso:
//   - arquivo do plugin que não é .md (fora o plugin.json, o .mcp.json e a LICENSE): script, binário, hook;
//   - pasta hooks/, bin/ ou agents/, ou chave hooks/mcpServers/lspServers/agents no plugin.json;
//   - conector do .mcp.json que não é `type: http` para um endereço da comunidade, ou que tenha command/args/env/headers;
//   - plugin do marketplace.json vindo de fora deste repositório;
//   - termo da varredura de sigilo (fornecedor, segredo, chave) em qualquer arquivo versionado.
// Mudar uma regra destas é uma decisão: edite este arquivo no mesmo pull request, de propósito.
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..')
const erros = []
const versionados = execSync('git ls-files', { cwd: raiz, encoding: 'utf8' }).split('\n').filter(Boolean)
const ler = (rel) => JSON.parse(fs.readFileSync(path.join(raiz, rel), 'utf8'))

const URL_CONECTOR = /^https:\/\/comunidade\.agronomos\.ia\.br\/api\/mcp(\/(geo|clima|qgis))?$/
const PERMITIDOS_FORA_DO_MD = new Set(['.claude-plugin/plugin.json', '.mcp.json', 'LICENSE'])
const PASTAS_PROIBIDAS = ['hooks', 'bin', 'agents']
const CHAVES_PROIBIDAS = ['hooks', 'mcpServers', 'lspServers', 'agents']
const SIGILO = /secret|token=|api[_-]?key/i
const REF_SEGREDO = /\$\{\{\s*secrets\.[A-Z0-9_]+\s*\}\}/g
// os nomes dos fornecedores são sigilosos e o repositório é público: a lista vem do segredo TERMOS_SIGILO do GitHub
// Actions (termos separados por vírgula), nunca do código — nem como hash, que deixaria confirmar um palpite
const FORNECEDORES = String(process.env.TERMOS_SIGILO ?? '')
  .split(',')
  .map((t) => t.trim().toLowerCase())
  .filter(Boolean)
const citaFornecedor = (linha) => {
  const l = linha.toLowerCase()
  return FORNECEDORES.some((t) => l.includes(t))
}

// 1) o marketplace: cada plugin vem de uma pasta deste repositório
const mkt = ler('.claude-plugin/marketplace.json')
const pastas = []
for (const p of mkt.plugins ?? []) {
  if (typeof p.source !== 'string' || !/^\.\/plugins\/[\w.-]+$/.test(p.source)) erros.push(`marketplace.json: o plugin "${p.name}" vem de fora do repositório (${JSON.stringify(p.source)})`)
  else pastas.push(p.source.slice(2))
}

for (const pasta of pastas) {
  const doPlugin = versionados.filter((f) => f.startsWith(`${pasta}/`)).map((f) => f.slice(pasta.length + 1))
  // 2) só texto
  for (const f of doPlugin) {
    if (PASTAS_PROIBIDAS.some((d) => f === d || f.startsWith(`${d}/`))) erros.push(`${pasta}/${f}: pasta ${f.split('/')[0]}/ não é permitida no plugin`)
    else if (!f.endsWith('.md') && !PERMITIDOS_FORA_DO_MD.has(f)) erros.push(`${pasta}/${f}: o plugin só leva Markdown (este arquivo não é .md)`)
  }
  // 3) o manifesto não declara nada que rode
  const manifesto = ler(`${pasta}/.claude-plugin/plugin.json`)
  for (const k of CHAVES_PROIBIDAS) if (k in manifesto) erros.push(`${pasta}/.claude-plugin/plugin.json: a chave "${k}" não é permitida`)
  // 4) os conectores: só HTTP para a comunidade
  const mcp = ler(`${pasta}/.mcp.json`)
  for (const [nome, s] of Object.entries(mcp.mcpServers ?? {})) {
    if (s.type !== 'http') erros.push(`${pasta}/.mcp.json: o conector "${nome}" não é type http`)
    for (const k of ['command', 'args', 'env', 'headers']) if (k in s) erros.push(`${pasta}/.mcp.json: o conector "${nome}" tem "${k}"`)
    if (!URL_CONECTOR.test(String(s.url ?? ''))) erros.push(`${pasta}/.mcp.json: o conector "${nome}" aponta para fora da comunidade (${s.url})`)
  }
}

// 5) a varredura de sigilo em tudo o que está versionado (a regex genérica pula este arquivo, que a contém)
for (const f of versionados) {
  const linhas = fs.readFileSync(path.join(raiz, f), 'utf8').split('\n')
  // a referência a um segredo do Actions (${{ secrets.NOME }}) é o jeito certo de usar um segredo, não um vazamento
  const linha = linhas.findIndex((l) => (f !== 'scripts/guarda.mjs' && SIGILO.test(l.replace(REF_SEGREDO, ''))) || citaFornecedor(l))
  if (linha >= 0) erros.push(`${f}:${linha + 1}: termo da varredura de sigilo (fornecedor, segredo ou chave)`)
}

if (!FORNECEDORES.length) console.warn('Aviso: TERMOS_SIGILO não está configurado — só a varredura genérica (segredo, chave) rodou.')
if (erros.length) {
  console.error(`O portão do marketplace recusou ${erros.length} ponto(s):\n${erros.map((e) => `  - ${e}`).join('\n')}`)
  process.exit(1)
}
console.log(`Portão do marketplace ok: ${pastas.length} plugin(s), ${versionados.length} arquivos versionados.`)
