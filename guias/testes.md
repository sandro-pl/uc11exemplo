PRIMEIRO CONTATO COM JEST

PREPARAÇÃO
Node 20 ou superior, npm, VS Code e Git.
Na raiz do laboratório:
    node --version
    npm --version
    npm install
    npm run exemplos
    npm start

Abra o endereço informado pelo terminal.
Mantenha o terminal do servidor aberto.
Use outro terminal para executar comandos, quando necessário.

O QUE ESTAMOS TESTANDO?
Cada app.js exporta uma função.
O teste importa essa função, fornece entradas e verifica o retorno.
A aplicação utiliza JavaScript para Node, sem document, formulário ou navegador.

ESTRUTURA DE UM TESTE

    const app = require('./app');

    test('descreve o comportamento esperado', () => {
      // Organizar: escolha entradas e o resultado esperado.
      // Agir: chame a função.
      // Verificar: use expect(resultado).matcher(esperado).
    });

CICLO DE TRABALHO
1. Leia o requisito.
2. Planeje o resultado esperado de forma independente.
3. Escreva um teste que revele o defeito.
4. Execute e interprete a mensagem.
5. Corrija a aplicação.
6. Execute novamente.
7. Verifique outros casos e possíveis regressões.
8. Registre os testes e a correção no Git.

LER A FALHA
Expected: resultado que o teste exige.
Received: resultado que a aplicação retornou.
O nome do teste deve explicar o comportamento que falhou.
Uma falha pode ser causada pelo código, pelo teste ou por um requisito mal interpretado.

TEST.TODO
É um lembrete, não um teste executado.
Substitua test.todo('descrição') por test('descrição', () => {...}).
O painel exige ao menos quatro testes aprovados e nenhum todo ou skip.

CASOS RECOMENDADOS
Normal: uma utilização comum.
Fronteira: exatamente no limite e, quando possível, logo antes ou depois.
Inválido: entrada fora do contrato.
Repetição: chamadas sucessivas não devem interferir uma na outra.

MATCHERS
toBe para valores primitivos.
toEqual e toStrictEqual para estruturas.
toBeCloseTo para números decimais.
toThrow para exceções.
toHaveLength e toContain para arrays.
resolves e rejects para Promises, sempre com await ou return.
Matchers de chamadas para dependências simuladas com jest.fn().

TESTES QUE PARECEM BONS, MAS SÃO FRACOS
expect(true).toBe(true) não testa a aplicação.
expect(resultado).toBeDefined() não comprova o valor correto.
Copiar a fórmula da implementação para calcular o esperado pode repetir o defeito.
Alterar o esperado para coincidir com o código defeituoso esconde a falha.

COMANDOS
Uma missão:
    npm test -- --runTestsByPath atividades/16-par-ou-impar/app.test.js
Todas as atividades:
    npm test
Exemplos independentes:
    npm run exemplos
Cobertura:
    npm run cobertura

Cobertura indica quais trechos foram exercitados.
Cobertura alta não comprova que os resultados foram verificados corretamente.

PAINEL
Executa Jest de verdade no computador.
XP é concedido uma vez por missão aprovada com evidência.
Se app.js, app.test.js, validação compartilhada ou configuração mudar,
a execução anterior fica desatualizada e precisa ser refeita.
O professor revisará se os testes representam os requisitos.
O painel não certifica a qualidade de uma suíte apenas por ela passar.

PROBLEMAS COMUNS
Cannot find module: confira caminho, pasta atual e npm install.
Jest não encontrado: execute npm install na raiz do laboratório.
No tests found: confira o nome app.test.js e o caminho.
Promise não aguardada: use await ou retorne a asserção.
Servidor não abre: confira o terminal e a porta.
Para mudar a porta no PowerShell:
    $env:UC11_PORT=3334
    npm start

REFERÊNCIAS
https://jestjs.io/docs/getting-started
https://jestjs.io/docs/using-matchers
https://jestjs.io/docs/asynchronous
https://jestjs.io/docs/mock-functions
