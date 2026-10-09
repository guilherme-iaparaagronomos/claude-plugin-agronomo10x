#!/usr/bin/env node
// Gera as 8 skills de drone (plugins/agronomo10x/skills/drone-*) a partir do playbook PÚBLICO
// `analise-drone-qgis` (repositório skills-agro, MIT) + os textos próprios do plugin em scripts/drone-extras/.
// O playbook é o texto-mãe: corrigiu o método? corrija lá e rode este script. Os arquivos gerados
// são commitados (quem clona o plugin não precisa do playbook).
//   node scripts/gera-drone.mjs [--playbook <caminho do SKILL.md>]
import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const arg = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null)
const playbook = arg('--playbook') ?? 'C:/dev/skills-oagronomia/skills-agro/analise-drone-qgis/SKILL.md'
const extrasDir = path.join(raiz, 'scripts', 'drone-extras')
const destino = path.join(raiz, 'plugins', 'agronomo10x', 'skills')

const md = fs.readFileSync(playbook, 'utf8').replace(/\r\n/g, '\n')
const versao = createHash('sha256').update(md).digest('hex').slice(0, 8)
const corpo = md.replace(/^---\n[\s\S]*?\n---\n/, '')

// ---- seções de nível 2 (fora de blocos de código) ----
const secoes = new Map() // chave = título do "## "
let atual = 'intro'
let dentroDeCodigo = false
const linhasPorSecao = { intro: [] }
for (const linha of corpo.split('\n')) {
  if (/^```/.test(linha)) dentroDeCodigo = !dentroDeCodigo
  if (!dentroDeCodigo && /^# /.test(linha)) continue // título do playbook
  if (!dentroDeCodigo && /^## /.test(linha)) {
    atual = linha.replace(/^## /, '').trim()
    linhasPorSecao[atual] = []
    continue
  }
  linhasPorSecao[atual].push(linha)
}
for (const [k, v] of Object.entries(linhasPorSecao)) secoes.set(k, v.join('\n').replace(/^\n+|\n+$/g, ''))

const acha = (prefixo) => {
  const chave = [...secoes.keys()].find((k) => k.startsWith(prefixo))
  if (!chave) throw new Error(`seção "${prefixo}" não encontrada no playbook`)
  return { titulo: chave, texto: secoes.get(chave) }
}

// ---- trechos do anexo: "**Título**" seguido de bloco de código ----
const anexo = acha('Anexo').texto
const trechos = new Map()
{
  let titulo = null
  let buf = []
  for (const linha of anexo.split('\n')) {
    const m = linha.match(/^\*\*([^*]+)\*\*(.*)$/) // o título pode ter um comentário depois do negrito
    if (m) {
      if (titulo) trechos.set(titulo, buf.join('\n').trim())
      titulo = m[1].trim()
      buf = m[2].trim() ? [m[2].trim()] : []
    } else if (titulo) buf.push(linha)
  }
  if (titulo) trechos.set(titulo, buf.join('\n').trim())
}
const trecho = (prefixo) => {
  const chave = [...trechos.keys()].find((k) => k.startsWith(prefixo))
  if (!chave) throw new Error(`trecho "${prefixo}" não encontrado no anexo`)
  return `**${chave}**\n\n${trechos.get(chave)}`
}

const extra = (nome) => {
  const p = path.join(extrasDir, `${nome}.md`)
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n').trim() : ''
}

// ---- as 8 skills ----
const SKILLS = [
  {
    nome: 'drone-roteiro',
    titulo: 'ClaudIA Drone — roteiro',
    description:
      'Roteiro para analisar ortomosaico de drone no QGIS do usuário pela ClaudIA QGIS: preparação (SRC em metros, alfa, pixel, área útil, espaçamentos, critério), perfil da imagem e arquétipo de plantio, pasta de trabalho, regras de ouro, erros já vistos e a entrega. Use quando houver um ortomosaico de drone aberto no QGIS e o pedido for linhas de plantio, falhas, contagem de plantas, uniformidade, faltantes ou segmentação de copas e daninhas, ou quando o usuário digitar um comando de drone. Não use para satélite, mapa de solo, interpolação ou vetor.',
    secoes: ['intro', 'Regras de ouro', '0.', '7.'],
    refs: { 'erros-ja-vistos.md': { secoes: ['6.'] }, 'trechos.md': { trechos: ['Otsu', 'Ler um bloco', 'Gravar feições', 'Pareamento', 'Núcleo do v3'] } },
  },
  {
    nome: 'drone-validacao',
    titulo: 'ClaudIA Drone — validação e anotação',
    description:
      'Janelas de validação, anotação de referência (pelo usuário no QGIS ou pela IA às cegas), pareamento e métricas com intervalo de confiança para qualquer resultado de drone (linhas, falhas, contagem, copas, daninhas), inclusive de outro software. Use ao criar janelas, anotar, validar, comparar tentativas, conferir erros, ou quando um número de drone estiver prestes a ser reportado sem status de validação.',
    secoes: ['5.'],
    refs: { 'trechos.md': { trechos: ['Pareamento', 'Gravar feições'] } },
  },
  {
    nome: 'drone-linhas',
    titulo: 'ClaudIA Drone — restituição de linhas',
    description:
      'Restituição de linhas de plantio em ortomosaico de drone (FFT por bloco, cristas, união de segmentos; alternativas para linhas curvas e duplas), com validação e critérios. Use para "linhas de plantio", "fileiras", "espaçamento entre linhas", "desvio das linhas", e antes de falhas ou contagem na fileira.',
    secoes: ['1.'],
    refs: { 'trechos.md': { trechos: ['Ler um bloco', 'Otsu'] } },
  },
  {
    nome: 'drone-falhas',
    titulo: 'ClaudIA Drone — falhas de plantio',
    description:
      'Falhas de plantio em ortomosaico de drone pelo motor híbrido v3 (plantas como picos, solo exposto, limiar local), critério do usuário (Stolf 1986 e a régua ABNT como sugestões), candidatas gravadas e tabela por critério e por classe de comprimento. Use para "falhas", "gaps", "vãos", "replantio", "% de falha", em cana, grãos e perenes.',
    secoes: ['2.'],
    refs: { 'trechos.md': { trechos: ['Núcleo do v3', 'Otsu', 'Gravar feições'] } },
  },
  {
    nome: 'drone-contagem',
    titulo: 'ClaudIA Drone — contagem de plantas',
    description:
      'Contagem de plantas e árvores em ortomosaico de drone (diagnóstico do padrão de plantio, mapa do alvo, máximos locais ou picos na fileira), plantas por hectare útil e por metro, emergência, uniformidade de estande e plantas faltantes em perenes. Use para "contar plantas", "estande", "população", "árvores por hectare", "uniformidade", "faltantes".',
    secoes: ['3.'],
    refs: { 'trechos.md': { trechos: ['Pareamento', 'Gravar feições'] } },
  },
  {
    nome: 'drone-segmentacao',
    titulo: 'ClaudIA Drone — segmentação de copas e daninhas',
    description:
      'Segmentação de copas, daninhas e outras plantas em ortomosaico de drone: watershed a partir dos pontos, SAM por ponto com refinos, plugins que o usuário já tenha (Geo SAM, SamGeo, GeoOSAM) com a nossa validação, plantas fora do padrão da linha. Use para "copas", "área de copa", "cobertura", "daninhas", "mato", "zonas de aplicação", "segmentar".',
    secoes: ['4.'],
    refs: {},
  },
  {
    nome: 'drone-imagem',
    titulo: 'ClaudIA Drone — imagem, resolução e voo',
    description:
      'Resolução, GSD e qualidade do ortomosaico de drone para cada tarefa (faixas por cultura e estádio, hora do voo, sobreposição, RGB e multiespectral, DSM e CHM), pixel exportado contra o GSD das fotos, super-resolução só para visualizar. Use para "dá para contar ou medir com esta imagem?", "qual altura de voo", "melhorar a resolução", "a imagem está ruim", e ao avaliar a adequação antes de uma análise.',
    secoes: [],
    refs: {},
  },
  {
    nome: 'drone-relatorio',
    titulo: 'ClaudIA Drone — relatório',
    description:
      'Relatório da análise de drone para o cliente: o completo por desafio (identificação, método, resultados por talhão e por hectare útil, validação, evidências, ressalvas, arquivos) e o de uma página, com a frase de capa e a regra de informação, não recomendação. Use para "relatório", "laudo do drone", "resumo para o cliente", "exportar", e ao fechar uma análise.',
    secoes: ['8.'],
    refs: {},
  },
]

const aviso = `<!-- GERADO por scripts/gera-drone.mjs a partir do playbook analise-drone-qgis (skills-agro, versão ${versao}) + scripts/drone-extras/. Não edite à mão: corrija a fonte e gere de novo. -->`

let total = 0
for (const s of SKILLS) {
  const pasta = path.join(destino, s.nome)
  fs.mkdirSync(pasta, { recursive: true })
  const partes = [
    `---\nname: ${s.nome}\ndescription: ${JSON.stringify(s.description)}\n---`,
    aviso,
    `# ${s.titulo}`,
    extra(`${s.nome}-antes`),
  ]
  for (const sec of s.secoes) {
    if (sec === 'intro') partes.push(secoes.get('intro'))
    else {
      const { titulo, texto } = acha(sec)
      partes.push(`## ${titulo}\n\n${texto}`)
    }
  }
  partes.push(extra(`${s.nome}-depois`))
  const refsNomes = Object.keys(s.refs)
  if (refsNomes.length) partes.push(`## Referências desta skill\n\n${refsNomes.map((r) => `- \`references/${r}\``).join('\n')}`)
  partes.push(`---\nFonte do método: playbook \`analise-drone-qgis\` da comunidade agrônomo10X (skills-agro, MIT; versão ${versao}). Sigilo, informação (não recomendação) e as regras dos conectores: skill \`roteamento-agronomo10x\`.`)
  const conteudo = partes.filter(Boolean).join('\n\n') + '\n'
  fs.writeFileSync(path.join(pasta, 'SKILL.md'), conteudo)
  total++
  const linhas = conteudo.split('\n').length
  if (linhas > 500) console.warn(`AVISO: ${s.nome}/SKILL.md tem ${linhas} linhas (limite recomendado: 500)`)

  if (refsNomes.length) fs.mkdirSync(path.join(pasta, 'references'), { recursive: true })
  for (const [arquivo, cfg] of Object.entries(s.refs)) {
    const blocos = [aviso]
    for (const sec of cfg.secoes ?? []) {
      const { titulo, texto } = acha(sec)
      blocos.push(`# ${titulo}\n\n${texto}`)
    }
    if (cfg.trechos?.length) blocos.push(`# Trechos de código (numpy, scipy e GDAL — o que o Python do QGIS tem)\n\n${cfg.trechos.map(trecho).join('\n\n')}`)
    fs.writeFileSync(path.join(pasta, 'references', arquivo), blocos.join('\n\n') + '\n')
  }
  console.log(`skill → ${path.relative(raiz, pasta)} (${linhas} linhas; refs: ${refsNomes.join(', ') || '—'})`)
}
console.log(`${total} skills geradas do playbook ${path.basename(playbook)} (versão ${versao})`)
