
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const {spawn} = require('node:child_process');
const ROOT = path.resolve(__dirname, '..');

function rodar(arquivos) {
  return new Promise((resolve, reject) => {
    const dir = path.join(ROOT, '.progresso');
    fs.mkdirSync(dir, {recursive: true});
    const relatorio = path.join(dir, 'jest-' + Date.now() + '-' + Math.random().toString(16).slice(2) + '.json');
    let bin;
    try {
      bin = path.join(path.dirname(require.resolve('jest/package.json')), 'bin/jest.js');
    } catch {
      reject(new Error('Jest não está instalado. Execute npm install na raiz do laboratório.'));
      return;
    }
    const args = [
      bin, '--runInBand', '--runTestsByPath', ...arquivos,
      '--json', '--outputFile=' + relatorio,
      '--config=' + path.join(ROOT, 'jest.config.cjs')
    ];
    const proc = spawn(process.execPath, args, {
      cwd: ROOT,
      windowsHide: true,
      env: {...process.env, FORCE_COLOR: '0'}
    });
    let log = '';
    let expirou = false;
    const acumular = chunk => {log = (log + chunk.toString()).slice(-40000);};
    proc.stdout.on('data', acumular);
    proc.stderr.on('data', acumular);
    const timer = setTimeout(() => {
      expirou = true;
      proc.kill();
    }, 60000);
    proc.on('error', error => {
      clearTimeout(timer);
      reject(error);
    });
    proc.on('close', code => {
      clearTimeout(timer);
      if (expirou) return reject(new Error('Execução excedeu 60 segundos. Verifique laços infinitos.'));
      try {
        const report = JSON.parse(fs.readFileSync(relatorio, 'utf8'));
        resolve({report, log, code});
      } catch {
        reject(new Error('Jest não produziu relatório válido.\n' + log));
      }
    });
  });
}

function qualificado(report, minimo = 4) {
  return report.success === true &&
    report.numPassedTests >= minimo &&
    report.numFailedTests === 0 &&
    report.numPendingTests === 0 &&
    report.numTodoTests === 0;
}

module.exports = {rodar, qualificado};
