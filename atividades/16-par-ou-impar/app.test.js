
const app = require('./app');

test('primeiro cenário guiado: compare com o requisito', () => {
  expect(app(...[3])).toEqual({"par":false,"impar":true,"dobro":6});
});

test.todo('caso normal: resultado e tipo de retorno');
test.todo('caso de fronteira: limite ou entrada zero, quando permitido');
test.todo('outro cenário que investigue um comportamento diferente');
test.todo('entrada inválida ou independência entre chamadas');

// Substitua cada test.todo por test(nome, () => { ... }).
// Os testes devem verificar o CONTRATO, não reproduzir o código.
// Para concluir: pelo menos quatro testes aprovados, sem todo ou skip.
// Escolha os matchers indicados na missão e explique a escolha.
