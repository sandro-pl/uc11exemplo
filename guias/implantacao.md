MISSÃO FINAL — IMPLANTAÇÃO LOCAL SIMULADA

OBJETIVO
Preparar uma versão reproduzível e verificar o aplicativo depois da implantação.

PRÉ-REQUISITOS
Concluir as oito missões essenciais:
16-par-ou-impar, 01-cinema, 09-medidas,
08-temperatura, 07-media-aluno, 13-desconto-loja,
14-tabuada e 12-caixa-eletronico.

Cada missão precisa ter ao menos quatro testes aprovados, sem todo ou skip.
A suíte deve representar o contrato. O professor fará a revisão.

1. CONFERIR O REPOSITÓRIO
    git status
    git remote -v
    git branch --show-current

Revise os testes e confirme que main contém as correções entregues.
Confira a versão e o package-lock.json.

2. REPRODUZIR A INSTALAÇÃO
Depois do primeiro npm install e do versionamento do lock:
    npm ci

3. PREPARAR A VERSÃO
    npm run implantar -- 1.0.0

O comando:
- executa as suítes das oito missões essenciais;
- verifica sucesso e ausência de testes pendentes;
- copia apenas essas aplicações e a validação compartilhada;
- cria package.json e lock sem dependências para a versão;
- gera manifesto e resultados dos testes;
- executa verificações básicas na cópia implantada.

Saída:
    implantacao/versao-1.0.0

Uma pasta de versão existente não é sobrescrita.
Para uma nova tentativa, escolha outra versão.

4. CONFERIR A IMPLANTAÇÃO
    cd implantacao/versao-1.0.0
    npm ci
    npm run verificar
    node atividades/01-cinema/executar.js

Os testes de implantação comparam entradas conhecidas com os requisitos.
Eles complementam os testes unitários; não substituem a suíte escrita.

5. REGISTRAR E ENTREGAR
Volte à raiz do laboratório.
Exporte as evidências pelo painel e salve o arquivo em evidencias/.
Registre em evidencias/IMPLANTACAO.md:
- versão;
- commit de origem;
- ambiente e versão do Node;
- comandos executados;
- resultado dos testes;
- resultado da verificação após implantação;
- limitações e decisão de liberação.

    git add evidencias
    git commit -m "docs: registra testes e implantacao local"
    git tag -a v1.0.0 -m "Entrega UC11"
    git push origin main
    git push origin v1.0.0

O identificador da versão e o commit efetivamente implantado devem constar no registro.
A pasta de implantação é um artefato gerado e está no .gitignore.
Entregue a pasta da versão separadamente quando solicitado.

CRITÉRIO DE LIBERAÇÃO
Suítes aprovadas, requisitos revisados, instalação reproduzível,
verificação após implantação e evidências completas.
