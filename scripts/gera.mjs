#!/usr/bin/env node
// Gera as variantes do plugin a partir de plugins/agronomo10x (a fonte, com os conectores de PRODUÇÃO):
//   dist/dev/agronomo10x   — .mcp.json apontando para o servidor de desenvolvimento (teste no Claude Code)
//   dist/prod/agronomo10x  — cópia fiel da fonte
//   dist/agronomo10x-<versão>.zip — com --zip: o arquivo para "Customize > Plugins > Add > Upload plugin" no claude.ai
// Uso:
//   node scripts/gera.mjs                                  (base dev = http://localhost:3000)
//   node scripts/gera.mjs --base http://<host-do-dev>:3000
//   node scripts/gera.mjs --zip
// A base de dev precisa ser o NEXT_PUBLIC_APP_URL do servidor de dev (o OAuth confere o `resource`).
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const fonte = path.join(raiz, 'plugins', 'agronomo10x')
const args = process.argv.slice(2)
const base = (args.includes('--base') ? args[args.indexOf('--base') + 1] : 'http://localhost:3000').replace(/\/$/, '')
const comZip = args.includes('--zip')

const manifesto = JSON.parse(fs.readFileSync(path.join(fonte, '.claude-plugin', 'plugin.json'), 'utf8'))
const mcp = JSON.parse(fs.readFileSync(path.join(fonte, '.mcp.json'), 'utf8'))

const limpa = (p) => fs.rmSync(p, { recursive: true, force: true })
const copia = (destino) => {
  limpa(destino)
  fs.mkdirSync(path.dirname(destino), { recursive: true })
  fs.cpSync(fonte, destino, { recursive: true, filter: (src) => !/[\\/](evals[\\/]results|__pycache__)/.test(src) })
}

// dev: só o .mcp.json muda (mesmos nomes de servidor, host do dev)
const dev = path.join(raiz, 'dist', 'dev', 'agronomo10x')
copia(dev)
const mcpDev = {
  mcpServers: Object.fromEntries(
    Object.entries(mcp.mcpServers).map(([nome, s]) => {
      const u = new URL(s.url)
      return [nome, { ...s, url: `${base}${u.pathname}` }]
    }),
  ),
}
fs.writeFileSync(path.join(dev, '.mcp.json'), JSON.stringify(mcpDev, null, 2) + '\n')
fs.writeFileSync(path.join(dev, 'DEV.md'), `Variante de DESENVOLVIMENTO gerada por scripts/gera.mjs em ${new Date().toISOString()}.\nConectores em ${base}. Não distribuir.\n`)
console.log(`dev  → ${path.relative(raiz, dev)} (conectores em ${base})`)

// prod: cópia fiel
const prod = path.join(raiz, 'dist', 'prod', 'agronomo10x')
copia(prod)
console.log(`prod → ${path.relative(raiz, prod)} (versão ${manifesto.version})`)

if (comZip) {
  const zip = path.join(raiz, 'dist', `agronomo10x-${manifesto.version}.zip`)
  limpa(zip)
  // o zip tem a pasta do plugin como única entrada de topo (formato aceito pelo upload do claude.ai)
  if (process.platform === 'win32') {
    execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${prod}' -DestinationPath '${zip}' -Force"`, { stdio: 'inherit' })
  } else {
    execSync(`cd "${path.dirname(prod)}" && zip -qr "${zip}" agronomo10x`, { stdio: 'inherit' })
  }
  console.log(`zip  → ${path.relative(raiz, zip)} (${Math.round(fs.statSync(zip).size / 1024)} KB)`)
}

// validação pelo CLI do Claude Code, quando houver
try {
  const saida = execSync(`claude plugin validate "${prod}"`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
  console.log(saida.trim())
} catch (e) {
  const msg = (e.stdout || '') + (e.stderr || '')
  console.log(msg.trim() || `(claude plugin validate indisponível: ${e.message})`)
}
