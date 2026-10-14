const app = require('./app');
let resultado;
if ("19-cadastro" === '10-adivinhacao') resultado = app(5, () => 0.4);
if ("19-cadastro" === '17-catalogo') resultado = app(1);
if ("19-cadastro" === '18-notificador') resultado = app('aluno@exemplo.com', console.log);
if ("19-cadastro" === '19-cadastro') resultado = app(3);
if ("19-cadastro" === '20-implantacao') {
  resultado = app('1.0.0', {
    testar: async () => ({aprovado: true}),
    publicar: async versao => console.log('Publicação simulada:', versao)
  });
}
Promise.resolve(resultado).then(console.log).catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
