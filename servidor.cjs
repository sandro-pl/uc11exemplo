
'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {rodar, qualificado} = require('./lib/rodar-jest.cjs');
const catalogo = require('./catalogo.json');
const academia = require('./academia.json');
const ROOT = __dirname;
const PORT = Number(process.env.UC11_PORT || 3333);
if (!Number.isInteger(PORT) || PORT < 1024 || PORT > 65535) throw new Error('Porta inválida');
const dir = path.join(ROOT, '.progresso');
fs.mkdirSync(dir, {recursive: true});
const stateFile = path.join(dir, 'estado.json');
let estado = {nome: '', resultados: {}};
if (fs.existsSync(stateFile)) estado = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
let ocupado = false;

function salvar() {
  fs.writeFileSync(stateFile, JSON.stringify(estado, null, 2), 'utf8');
}
function achar(id) {
  const a = catalogo.find(item => item.id === id);
  if (!a) throw new Error('Missão inexistente');
  return a;
}
function fingerprint(a) {
  const hash = crypto.createHash('sha256');
  for (const file of [
    a.folder + '/' + a.id + '/app.js',
    a.folder + '/' + a.id + '/app.test.js',
    'lib/validar.js', 'jest.config.cjs'
  ]) hash.update(fs.readFileSync(path.join(ROOT, file)));
  return hash.digest('hex');
}
function visao() {
  const resultados = {};
  for (const a of catalogo) {
    const r = estado.resultados[a.id];
    if (r) resultados[a.id] = {...r, atual: r.hash === fingerprint(a)};
  }
  return {nome: estado.nome, resultados, ocupado};
}
function responder(res, code, value, type = 'application/json; charset=utf-8') {
  res.writeHead(code, {'Content-Type': type, 'Cache-Control': 'no-store'});
  res.end(type.startsWith('application/json') ? JSON.stringify(value) : value);
}
async function corpo(req) {
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 16000) throw new Error('Formulário muito grande');
  }
  return JSON.parse(raw || '{}');
}
const staticFiles = {
  '/': ['painel/index.html', 'text/html; charset=utf-8'],
  '/painel.js': ['painel/painel.js', 'text/javascript; charset=utf-8'],
  '/estilos.css': ['painel/estilos.css', 'text/css; charset=utf-8']
};

const server = http.createServer(async (req, res) => {
  try {
    if (![ '127.0.0.1:' + PORT, 'localhost:' + PORT ].includes(req.headers.host)) {
      return responder(res, 403, {error: 'Use o endereço local do laboratório'});
    }
    if (req.headers.origin && req.headers.origin !== 'http://' + req.headers.host) {
      return responder(res, 403, {error: 'Origem não permitida'});
    }
    const url = new URL(req.url, 'http://' + req.headers.host);
    if (req.method === 'GET' && staticFiles[url.pathname]) {
      const [file, type] = staticFiles[url.pathname];
      return responder(res, 200, fs.readFileSync(path.join(ROOT, file)), type);
    }
    if (req.method === 'GET' && url.pathname === '/api/catalogo') {
      return responder(res, 200, {catalogo, academia});
    }
    if (req.method === 'GET' && url.pathname === '/api/estado') {
      return responder(res, 200, visao());
    }
    if (req.method === 'GET' && url.pathname === '/api/arquivo') {
      const a = achar(url.searchParams.get('id'));
      const file = url.searchParams.get('file');
      if (!['app.js', 'app.test.js', 'README.md'].includes(file)) throw new Error('Arquivo inválido');
      return responder(res, 200, {
        conteudo: fs.readFileSync(path.join(ROOT, a.folder, a.id, file), 'utf8')
      });
    }
    if (req.method === 'GET' && url.pathname === '/api/guia') {
      const name = url.searchParams.get('nome');
      if (!['git', 'testes', 'implantacao'].includes(name)) throw new Error('Guia inválido');
      return responder(res, 200, {conteudo: fs.readFileSync(path.join(ROOT, 'guias', name + '.md'), 'utf8')});
    }
    if (req.method === 'GET' && url.pathname === '/api/exportar') {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': 'attachment; filename="evidencias-uc11.json"'
      });
      return res.end(JSON.stringify({...visao(), exportadoEm: new Date().toISOString()}, null, 2));
    }
    if (req.method === 'POST' && url.pathname === '/api/rodar') {
      if (ocupado) return responder(res, 409, {error: 'Uma execução já está em andamento'});
      const {id} = await corpo(req);
      const a = achar(id);
      const antes = fingerprint(a);
      ocupado = true;
      try {
        const {report, log} = await rodar([path.join(ROOT, a.folder, a.id, 'app.test.js')]);
        const atual = fingerprint(a);
        const anterior = estado.resultados[id];
        const passou = qualificado(report, a.minTests) && antes === atual;
        estado.resultados[id] = {
          hash: antes,
          passou,
          data: new Date().toISOString(),
          aprovados: report.numPassedTests,
          falhas: report.numFailedTests,
          pendentes: report.numPendingTests + (report.numTodoTests || 0),
          log,
          evidencia: anterior && anterior.hash === antes && passou ? anterior.evidencia : null,
          aviso: antes !== atual ? 'Arquivos mudaram durante o teste. Execute novamente.' : ''
        };
        salvar();
        return responder(res, 200, estado.resultados[id]);
      } finally {
        ocupado = false;
      }
    }
    if (req.method === 'POST' && url.pathname === '/api/evidencia') {
      const dados = await corpo(req);
      const a = achar(dados.id);
      const r = estado.resultados[a.id];
      if (!r || !r.passou || r.hash !== fingerprint(a)) {
        throw new Error('Execute os testes atuais com sucesso antes de concluir a missão');
      }
      for (const key of ['nome', 'cenario', 'falha', 'correcao', 'matchers', 'commit']) {
        if (typeof dados[key] !== 'string' || dados[key].trim().length < 3) {
          throw new Error('Preencha o campo: ' + key);
        }
      }
      if (!/^[a-f0-9]{7,40}$/i.test(dados.commit.trim())) {
        throw new Error('Use o identificador do commit mostrado por git log --oneline');
      }
      estado.nome = dados.nome.trim();
      r.evidencia = Object.fromEntries(
        ['cenario', 'falha', 'correcao', 'matchers', 'commit'].map(k => [k, dados[k].trim()])
      );
      salvar();
      return responder(res, 200, {ok: true});
    }
    responder(res, 404, {error: 'Recurso não encontrado'});
  } catch (error) {
    responder(res, 400, {error: error.message});
  }
});
server.listen(PORT, '127.0.0.1', () => {
  console.log('Laboratório UC11: http://127.0.0.1:' + PORT);
  console.log('Mantenha este terminal aberto. Ctrl+C encerra o painel.');
});
server.on('error', error => {
  console.error(error.message);
  process.exitCode = 1;
});
