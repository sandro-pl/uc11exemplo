# Caixa eletrônico

UC11 — Executar teste e implantação de aplicativos computacionais.

app(valor). Retorne um objeto com as chaves 100, 50 e 10 indicando a quantidade de notas. Use primeiro as maiores notas. Aceite zero. Rejeite valores que não sejam múltiplos de 10 com erro "Saque deve ser múltiplo de 10".

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

toEqual, toThrow, toBeGreaterThanOrEqual

## Execução

    node atividades/12-caixa-eletronico/executar.js
    npm test -- --runTestsByPath atividades/12-caixa-eletronico/app.test.js

## Casos mínimos

Pelo menos quatro testes aprovados, nenhum test.todo ou test.skip.
Cubra cenários normais, limites e entradas inválidas quando aplicáveis.
Use mais de uma entrada: um único cenário pode esconder um defeito.

## Exemplo do contrato

Entrada: [180]

Retorno: {"10":3,"50":1,"100":1}

## Evidência

Informe cenário, falha observada, correção, justificativa dos matchers e commit.
