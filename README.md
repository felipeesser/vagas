## Execução:
- Instale as dependências com o comando npm install
- Crie o banco com os comandos sql contidos em Banco.sql
- Adicione as credenciais do banco em nodemon.json
- Execute o comando npm start

## Endpoints:
- POST,GET,PATCH,DELETE( criação, consulta, atualização, destruição): localhost:3000/clientes
- GET( consulta um cliente): localhost:3000/clientes/id_cliente
- o corpo das requisições deve ser em formato json