# Ausência de dados

UC11 — Executar teste e implantação de aplicativos computacionais.

app(id) retorna {usuario, email}. Usuário 1: {id:1,email:"ana@exemplo.com"}. Usuário 2: {id:2}, sem email. Outros IDs: usuario null. email deve ser undefined quando não estiver disponível.

## Trabalho do estudante

1. Leia app.js e execute executar.js pelo Node.
2. Liste resultados esperados antes de escrever as asserções.
3. Substitua os test.todo por testes reais.
4. Reproduza as falhas e registre o resultado observado.
5. Faça um commit dos testes que reproduzem o problema.
6. Corrija a implementação, mantendo o contrato.
7. Execute a suíte novamente e investigue regressões.
8. Faça o commit da correção e registre as evidências no painel.

Existem dois defeitos intencionais nesta aplicação.
Não altere os testes para aceitar um comportamento contrário ao contrato.

## Matchers da missão

toBeNull, toBeUndefined, toBeDefined, toStrictEqual

## Execução

    node extras/19-cadastro/executar.js
    npm test -- --runTestsByPath extras/19-cadastro/app.test.js

## Casos mínimos

Pelo menos quatro testes aprovados, nenhum test.todo ou test.skip.
Cubra cenários normais, limites e entradas inválidas quando aplicáveis.
Use mais de uma entrada: um único cenário pode esconder um defeito.



## Evidência

Informe cenário, falha observada, correção, justificativa dos matchers e commit.
