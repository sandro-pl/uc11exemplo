AULA 1 — GIT, GITHUB E TROCA DE REPOSITÓRIO
Duração: 4 horas

OBJETIVOS
Distinguir pasta, repositório, remoto, branch, commit e pull request.
Criar um repositório novo para a UC11.
Alternar entre a API anterior e o laboratório.
Registrar testes, correções e a versão entregue.

1. CONFERIR O REPOSITÓRIO DA API — 0 a 20 min

No terminal da API:
    Get-Location
    git status
    git remote -v
    git branch --show-current

Leia o caminho e o endereço remoto.
Se houver trabalho pendente, preserve-o com um commit adequado antes de trocar de projeto.
Trocar de PASTA muda o repositório em que os comandos atuarão.
Trocar de BRANCH muda a linha de trabalho dentro do mesmo repositório.

2. ENTENDER O FLUXO — 20 a 45 min

Arquivo alterado → git add → área de preparação → git commit → histórico local.
git push envia commits ao remoto.
git pull --ff-only atualiza a branch local sem criar uma mesclagem automática.
git status mostra a situação atual.
git diff mostra alterações ainda não preparadas.
git diff --staged mostra alterações preparadas.

3. CRIAR E CLONAR O NOVO REPOSITÓRIO — 45 a 85 min

No GitHub, crie uc11-jest-lab na sua conta.
Nesta atividade, crie o repositório vazio, sem README e sem .gitignore.
Copie a URL HTTPS exibida pelo GitHub.

Saia da pasta da API para a pasta que reúne seus projetos:
    cd ..

Substitua SEU-USUARIO na próxima linha:
    git clone https://github.com/SEU-USUARIO/uc11-jest-lab.git
    cd uc11-jest-lab
    code .

Confira novamente:
    Get-Location
    git remote -v
    git status

Copie para ESTA pasta o conteúdo da pasta uc11-estudante fornecida pelo professor.
Inclua .gitignore. Não copie o ZIP do professor.
O package.json deve ficar na raiz do repositório clonado.

Confirme o destino antes de continuar:
    git remote -v

4. INTERVALO — 85 a 100 min

5. PRIMEIRA VERSÃO — 100 a 125 min

Verifique sua identidade:
    git config user.name
    git config user.email

Se necessário, configure apenas este repositório:
    git config user.name "Seu Nome"
    git config user.email "seu-email-do-github"

Instale as dependências:
    npm install

Confira que node_modules não aparece entre os arquivos que serão versionados:
    git status

Prepare e confira:
    git add .
    git diff --staged

Crie o commit inicial:
    git commit -m "chore: inicia laboratorio UC11"
    git branch -M main
    git push -u origin main

Versione package-lock.json gerado pelo npm.
Ele permite reproduzir a instalação com npm ci.

6. BRANCH DE TREINO — 125 a 165 min

    git switch -c docs/apresentacao

No VS Code, crie evidencias/apresentacao.md com seu nome e uma expectativa para a UC11.

    git status
    git diff
    git add evidencias/apresentacao.md
    git diff --staged
    git commit -m "docs: registra apresentacao"
    git log --oneline -5

Um commit descreve uma mudança compreensível.
Faça commits pequenos, com mensagens que expliquem o propósito.

7. PUSH E PULL REQUEST — 165 a 200 min

    git push -u origin docs/apresentacao

No GitHub, abra um pull request de docs/apresentacao para main.
Descreva a mudança. Revise o arquivo e faça a mesclagem.

Volte para main e atualize:
    git switch main
    git pull --ff-only

8. CONFLITOS EM ARQUIVO DE TREINO — 200 a 225 min

Com orientação do professor, pratique um conflito em evidencias/treino-git.md.
Use duas branches que partem do mesmo commit e alteram a mesma linha.
Mescle a primeira em main e depois tente mesclar a segunda.
No VS Code, escolha o conteúdo final, remova os marcadores e confira o arquivo.
Depois:
    git add evidencias/treino-git.md
    git commit -m "docs: resolve conflito do treino"

A resolução preserva o conteúdo que a equipe decidiu manter.
Se precisar interromper uma mesclagem ainda não concluída:
    git merge --abort

9. ENTREGA E ALTERNÂNCIA — 225 a 240 min

Para voltar à API, entre na pasta correta e confira o remoto:
    cd ../NOME-DA-PASTA-DA-API
    git remote -v
    git status

Para retornar ao laboratório:
    cd ../uc11-jest-lab
    git remote -v
    git status

NAS AULAS DE JEST

Para cada missão:
    git switch main
    git pull --ff-only
    git switch -c fix/16-par-ou-impar

Escreva os testes que reproduzem a falha:
    git add atividades/16-par-ou-impar/app.test.js
    git commit -m "test: reproduz falhas de paridade e dobro"

Corrija a aplicação:
    git add atividades/16-par-ou-impar/app.js
    git commit -m "fix: corrige paridade e dobro"
    git push -u origin fix/16-par-ou-impar

Abra o pull request, revise e mescle.
Depois:
    git switch main
    git pull --ff-only

Use git log --oneline para obter o commit que será registrado na evidência.
O progresso pessoal em .progresso não é versionado.
Exporte as evidências e salve o arquivo em evidencias/ para a entrega.

REFERÊNCIAS
https://git-scm.com/docs/git-clone
https://git-scm.com/docs/git-switch
https://git-scm.com/docs/git-merge
