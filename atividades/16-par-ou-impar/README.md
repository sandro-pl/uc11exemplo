# Par ou ímpar

UC11 — Executar teste e implantação de aplicativos computacionais.

app(numero). Retorne {par, impar, dobro}. par e impar devem ser booleanos opostos. dobro é o número multiplicado por dois. Aceite inteiros negativos, positivos e zero.

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

toBe, not, toBeDefined

## Execução

    node atividades/16-par-ou-impar/executar.js
    npm test -- --runTestsByPath atividades/16-par-ou-impar/app.test.js

## Casos mínimos

Pelo menos quatro testes aprovados, nenhum test.todo ou test.skip.
Cubra cenários normais, limites e entradas inválidas quando aplicáveis.
Use mais de uma entrada: um único cenário pode esconder um defeito.

## Exemplo do contrato

Entrada: [3]

Retorno: {"par":false,"impar":true,"dobro":6}

## Evidência

Informe cenário, falha observada, correção, justificativa dos matchers e commit.
