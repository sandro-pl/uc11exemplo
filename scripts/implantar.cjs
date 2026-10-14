
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');
const {rodar} = require('../lib/rodar-jest.cjs');
const catalogo = require('../catalogo.json');
const ROOT = path.resolve(__dirname, '..');

(async () => {
  const versao = process.argv[2] || '1.0.0';
  if (!/^\d+\.\d+\.\d+$/.test(versao)) throw new Error('Use uma versão como 1.0.0');
  const destino = path.join(ROOT, 'implantacao', 'versao-' + versao);
  if (fs.existsSync(destino)) throw new Error('Esta versão já existe. Escolha outra versão.');
  const essenciais = catalogo.filter(a => a.core);
  const arquivos = essenciais.map(a => path.join(ROOT, a.folder, a.id, 'app.test.js'));
  const {report, log} = await rodar(arquivos);
  console.log(log);
  if (!report.success || report.numFailedTests || report.numPendingTests || report.numTodoTests) {
    throw new Error('Liberação bloqueada: há falhas ou testes pendentes.');
  }
  for (const file of arquivos) {
    const suite = report.testResults.find(s => path.resolve(s.name) === path.resolve(file));
    const testes = suite ? suite.assertionResults : [];
    if (testes.filter(t => t.status === 'passed').length < 4 ||
        testes.some(t => t.status !== 'passed')) {
      throw new Error('Liberação bloqueada: cada missão deve ter quatro testes reais aprovados.');
    }
  }
  fs.mkdirSync(destino, {recursive: true});
  fs.mkdirSync(path.join(destino, 'lib'));
  fs.copyFileSync(path.join(ROOT, 'lib/validar.js'), path.join(destino, 'lib/validar.js'));
  for (const a of essenciais) {
    const dir = path.join(destino, a.folder, a.id);
    fs.mkdirSync(dir, {recursive: true});
    for (const file of ['app.js', 'executar.js']) {
      fs.copyFileSync(path.join(ROOT, a.folder, a.id, file), path.join(dir, file));
    }
  }
  const pacote = {
    name: 'uc11-versao-local',
    version: versao,
    private: true,
    scripts: {verificar: 'node verificar.cjs'},
    engines: {node: '>=20'}
  };
  fs.writeFileSync(path.join(destino, 'package.json'), JSON.stringify(pacote, null, 2));
  fs.writeFileSync(path.join(destino, 'package-lock.json'), JSON.stringify({
    name: pacote.name, version: versao, lockfileVersion: 3, requires: true,
    packages: {'': {name: pacote.name, version: versao, engines: pacote.engines}}
  }, null, 2));
  const smoke = essenciais.map(a => ({
    arquivo: './' + a.folder + '/' + a.id + '/app.js',
    args: a.sample[0], esperado: a.sample[1]
  }));
  fs.writeFileSync(path.join(destino, 'cenarios.json'), JSON.stringify(smoke, null, 2));
  fs.writeFileSync(path.join(destino, 'verificar.cjs'),
    "const assert = require('node:assert/strict');\n" +
    "for (const c of require('./cenarios.json')) {\n" +
    "  assert.deepStrictEqual(require(c.arquivo)(...c.args), c.esperado);\n" +
    "  console.log('APROVADO:', c.arquivo);\n" +
    "}\nconsole.log('Verificação após implantação concluída.');\n"
  );
  const commit = spawnSync('git', ['rev-parse', 'HEAD'], {cwd: ROOT, encoding: 'utf8', windowsHide: true});
  const manifesto = {
    versao,
    commit: commit.status === 0 ? commit.stdout.trim() : 'não identificado',
    node: process.version,
    criadoEm: new Date().toISOString(),
    atividades: essenciais.map(a => a.id),
    testesAprovados: report.numPassedTests,
    verificacaoPosImplantacao: false
  };
  fs.writeFileSync(path.join(destino, 'resultado-testes.json'), JSON.stringify(report, null, 2));
  const verificado = spawnSync(process.execPath, ['verificar.cjs'], {
    cwd: destino, encoding: 'utf8', windowsHide: true
  });
  console.log(verificado.stdout || '');
  manifesto.verificacaoPosImplantacao = verificado.status === 0;
  fs.writeFileSync(path.join(destino, 'manifesto.json'), JSON.stringify(manifesto, null, 2));
  if (verificado.status !== 0) {
    throw new Error('A cópia implantada falhou na verificação. ' + (verificado.stderr || ''));
  }
  console.log('Versão local preparada:', destino);
  console.log('Confira o manifesto e registre a decisão de liberação.');
})().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
