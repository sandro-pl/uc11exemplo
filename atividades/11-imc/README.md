# Calculadora de IMC

UC11 — Executar teste e implantação de aplicativos computacionais.

Exercício de classificação: app(peso, altura) retorna {imc, classificacao}. IMC = peso / altura². Neste modelo: abaixo se menor que 18.5; normal de 18.5 até menos de 25; acima a partir de 25. Peso e altura positivos.

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

toBeCloseTo, toBeLessThan, toBeGreaterThanOrEqual

## Execução

    node atividades/11-imc/executar.js
    npm test -- --runTestsByPath atividades/11-imc/app.test.js

## Casos mínimos

Pelo menos quatro testes aprovados, nenhum test.todo ou test.skip.
Cubra cenários normais, limites e entradas inválidas quando aplicáveis.
Use mais de uma entrada: um único cenário pode esconder um defeito.

## Exemplo do contrato

Entrada: [70,2]

Retorno: {"imc":17.5,"classificacao":"abaixo"}

## Evidência

Informe cenário, falha observada, correção, justificativa dos matchers e commit.
