Para rodar o projeto: 
    • Tenha Docker e Node 16 (ou acima) disponíveis na sua máquina.
    • Tenha as rotas 3000 e 8080 desocupadas da sua máquina. 
    • No Terminal do projeto, rode: docker compose up -d
    • O projeto, quando aberto, já estará rodando com Webpack.

Caso queira testar os testes unitários do projeto, rode os respectivos comandos:
    • cd Back (Para entrar no backend do projeto)
    • npm i (Para baixar os pacotes e dependências)
    • E então, você poderá rodar os respectivos comandos os testes de users e requests, respectivamente:
        • npm run test -t src/users/users.spec.ts
        • npm run test -t src/requests/requests.spec.ts

Para começar a utilizar o projeto, abra no seu navegador através de: http://localhost:3000