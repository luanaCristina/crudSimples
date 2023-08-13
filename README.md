# CRUD
Frondend usando  html5, emmet, Bootstrap e css.
Backend usando JS com o express, ejs, nodemon, asserts, dotenv e banco MongoDB.

Para rodar o projeto:
1. Primeiro clone o projeto
2. Entre na pasta do seu projeto no terminal (exemplo: cd pasta)
3. adicione 2 arquivos: .env e .gitignore
4. dentro do arqurivo .env adicione a variável DATABASE_URL e coloque dentro dela o seu drive do mongodb que consta dentro do seu cluster.
DATABASE_URL = suaURLdoMongoDBCluster
5. Dentro do arquivo .gitignore adicione o que consta abaixo:
node_modules/
.env
observação: 
- o node_modules é a pasta criada com todas as bibliotecas do seu projeto.
- o .env consta o seu drive do mongodb com o login e senha.
7. Execute o comando no terminal abaixo para instalar todas as dependências (node_modules)
npm install

8. Rode o projeto no terminal
npm run dev

9. Abra o browser de sua preferência (Chrome, Firefox, Opera, etc) e coloque a rota abaixo
- localhost:3001/index 

10. No arquivo indexEmmet.ejs consta alguns exemplos de emmet.

11. Algumas rotas:
- localhost:3001/ler
- localhost:3001/emmet
- localhost:3001/index (página inicial)
- localhost:3001/show (com os métodos post e get)
- localhost:3001/edit/:id (adicionar no lugar dos :id o id do mongodb que será alterado)
