
'use strict';
const $ = selector => document.querySelector(selector);
let catalogo = [], academia = [], estado = {resultados: {}}, atual = null;
const h = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

async function api(url, body) {
  const response = await fetch(url, body ? {
    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)
  } : {});
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Falha na operação');
  return data;
}
function concluida(a) {
  const r = estado.resultados[a.id];
  return Boolean(r && r.atual && r.passou && r.evidencia);
}
function status(a) {
  const r = estado.resultados[a.id];
  if (!r) return 'Pronta para começar';
  if (!r.atual) return 'Código alterado · execute novamente';
  if (concluida(a)) return 'Concluída · evidência registrada';
  return r.passou ? 'Testes aprovados · registre a evidência' : 'Investigue as falhas ou testes pendentes';
}
async function atualizar() {
  estado = await api('/api/estado');
  const completas = catalogo.filter(concluida);
  const xp = completas.reduce((total, a) => total + a.xp, 0);
  $('#xp').textContent = xp + ' XP';
  $('#nivel').textContent = xp >= 1600 ? 'Especialista em qualidade' : xp >= 800 ? 'Analista de testes' : xp >= 300 ? 'Investigador de falhas' : 'Aprendiz de testes';
  $('#essenciais').textContent = completas.filter(a => a.core).length + ' / 8';
  $('#concluidas').textContent = completas.length + ' / 20';
  const badges = [];
  if (completas.length) badges.push('Primeira evidência');
  if (completas.filter(a => a.core).length === 8) badges.push('Trilha essencial completa');
  if (completas.some(a => a.folder === 'extras')) badges.push('Além do básico');
  $('#conquistas').textContent = badges.join(' · ') || 'Sua primeira conquista está próxima';
  renderizar();
}
function renderizar() {
  const busca = $('#busca').value.toLowerCase();
  const trilha = $('#trilha').value;
  const aula = $('#aula').value;
  const itens = catalogo.filter(a =>
    (trilha === 'all' || (trilha === 'core' ? a.core : a.folder === 'extras')) &&
    (!aula || String(a.lesson) === aula) &&
    (a.title + ' ' + a.id + ' ' + a.matchers.join(' ')).toLowerCase().includes(busca)
  );
  $('#lista').innerHTML = itens.map(a => '<article class="card">' +
    '<span class="tag">' + h(a.id.slice(0, 2)) + ' · AULA ' + a.lesson + ' · ' + a.xp + ' XP</span>' +
    '<h2>' + h(a.title) + '</h2>' +
    '<p>' + (a.core ? 'Trilha essencial' : a.folder === 'extras' ? 'Desafio extra' : 'Aprofundamento') + ' · 2 defeitos intencionais</p>' +
    '<div class="chips">' + a.matchers.map(m => '<span class="chip">' + h(m) + '</span>').join('') + '</div>' +
    '<span class="status">' + h(status(a)) + '</span>' +
    '<button data-mission="' + h(a.id) + '">Abrir missão →</button></article>'
  ).join('') || '<p>Nenhuma missão encontrada para este filtro.</p>';
}
async function abrir(id) {
  atual = catalogo.find(a => a.id === id);
  $('#titulo').textContent = atual.title;
  $('#dialog-tag').textContent = atual.id + ' · ' + atual.xp + ' XP';
  $('#contrato').textContent = atual.contract;
  $('#matchers').innerHTML = atual.matchers.map(m => '<span class="chip">' + h(m) + '</span>').join('');
  const local = atual.folder + '/' + atual.id;
  $('#local').textContent = 'Edite no VS Code: ' + local + '/app.js e app.test.js';
  $('#comando').textContent = 'npm test -- --runTestsByPath ' + local + '/app.test.js';
  $('#dicas').innerHTML = atual.hints.map((d, i) => '<details><summary>Dica ' + (i + 1) + '</summary><p>' + h(d) + '</p></details>').join('');
  const r = estado.resultados[id];
  $('#resultado').textContent = r ? status(atual) + '. Aprovados: ' + r.aprovados + ' · Falhas: ' + r.falhas + ' · Pendentes: ' + r.pendentes + '. ' + (r.aviso || '') : 'Ainda não executado pelo painel.';
  $('#log').textContent = r ? r.log : 'A saída real do Jest aparecerá aqui.';
  const form = $('#evidencia');
  form.reset();
  form.elements.nome.value = estado.nome || '';
  if (r && r.evidencia) {
    for (const [key, value] of Object.entries(r.evidencia)) form.elements[key].value = value;
  }
  $('#rodar').disabled = estado.ocupado;
  $('#codigo').textContent = (await api('/api/arquivo?id=' + id + '&file=app.js')).conteudo;
  $('#missao').showModal();
}
async function secao(view) {
  for (const button of document.querySelectorAll('[data-view]')) button.classList.toggle('active', button.dataset.view === view);
  $('#lista').hidden = view !== 'missoes';
  $('#filtros').hidden = view !== 'missoes';
  $('#academia').hidden = view !== 'academia';
  $('#guia').hidden = ['missoes', 'academia'].includes(view);
  if (view === 'academia') {
    $('#academia').innerHTML = academia.map(([name, desc, code, tip]) =>
      '<article class="card"><h2>' + h(name) + '</h2><p>' + h(desc) +
      '</p><pre>' + h(code) + '</pre><p>' + h(tip) + '</p></article>'
    ).join('');
  } else if (!['missoes', 'academia'].includes(view)) {
    const titles = {git: 'Aula 1 · Git e o novo repositório', testes: 'Primeiros testes com Jest', implantacao: 'Missão final · Implantação local'};
    $('#guia-titulo').textContent = titles[view];
    $('#guia-texto').textContent = (await api('/api/guia?nome=' + view)).conteudo;
  }
}
document.addEventListener('click', async event => {
  const b = event.target.closest('button');
  if (!b) return;
  try {
    if (b.dataset.mission) await abrir(b.dataset.mission);
    if (b.dataset.view) await secao(b.dataset.view);
    if (b.dataset.file && atual) {
      $('#codigo').textContent = (await api('/api/arquivo?id=' + atual.id + '&file=' + b.dataset.file)).conteudo;
    }
  } catch (error) {
    $('#mensagem').textContent = error.message;
  }
});
$('#fechar').onclick = () => $('#missao').close();
$('#exportar').onclick = () => {window.location.href = '/api/exportar';};
$('#copiar').onclick = async () => {
  try {
    await navigator.clipboard.writeText($('#comando').textContent);
    $('#resultado').textContent = 'Comando copiado.';
  } catch {
    $('#resultado').textContent = 'Selecione o comando acima e copie manualmente.';
  }
};
$('#rodar').onclick = async () => {
  $('#rodar').disabled = true;
  $('#resultado').textContent = 'Jest está executando seus testes...';
  try {
    const r = await api('/api/rodar', {id: atual.id});
    $('#log').textContent = r.log;
    await atualizar();
    $('#resultado').textContent = status(atual) + '. Aprovados: ' + r.aprovados + ' · Falhas: ' + r.falhas + ' · Pendentes: ' + r.pendentes + '. ' + r.aviso;
  } catch (error) {
    $('#resultado').textContent = error.message;
  } finally {
    $('#rodar').disabled = false;
  }
};
$('#evidencia').onsubmit = async event => {
  event.preventDefault();
  try {
    const values = Object.fromEntries(new FormData(event.target));
    await api('/api/evidencia', {...values, id: atual.id});
    await atualizar();
    $('#resultado').textContent = 'Missão concluída. XP e evidência registrados.';
  } catch (error) {
    $('#resultado').textContent = error.message;
  }
};
for (const selector of ['#busca', '#trilha', '#aula']) $(selector).addEventListener('input', renderizar);
(async () => {
  try {
    const dados = await api('/api/catalogo');
    catalogo = dados.catalogo;
    academia = dados.academia;
    await atualizar();
  } catch (error) {
    $('#mensagem').textContent = 'Não foi possível carregar o laboratório: ' + error.message;
  }
})();
