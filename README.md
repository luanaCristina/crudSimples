# CRUD Simples com Node.js, EJS e MongoDB

> Um projeto de aplicação web CRUD (Create, Read, Update, Delete) completo, construído com Node.js, EJS e MongoDB.

## 🚀 Site no Ar (Live Demo)

O projeto está sendo executado publicamente através do Render.com.

**Acesse em: [https://crudlua.onrender.com/index](https://crudlua.onrender.com/index)**

*(Nota: O servidor gratuito do Render pode "dormir" após inatividade. O primeiro carregamento pode demorar de 30 a 60 segundos para "acordar" o servidor.)*

---

## ✨ Funcionalidades

* **Servidor Back-end:** Criado com Node.js e Express.js.
* **Banco de Dados:** Conectado ao MongoDB Atlas para persistir os dados.
* **Renderização Dinâmica:** Usa EJS (Embedded JavaScript) para gerar o HTML do lado do servidor.
* **Operações CRUD:**
    * **Create:** Adiciona novos registros (nome, sobrenome) ao banco.
    * **Read:** Lista todos os registros existentes em uma tabela.
    * **Update:** Edita um registro existente.
    * **Delete:** Remove um registro do banco.
* **Arquivos Estáticos:** Serve arquivos CSS e imagens da pasta `public`.
* **Estilização:** Utiliza Bootstrap 5 para uma interface limpa.

---

## 🛠️ Tecnologias Utilizadas

* **Back-end:** Node.js, Express.js
* **Front-end:** EJS (Embedded JavaScript), HTML, CSS
* **Estilização:** Bootstrap 5 (via CDN)
* **Banco de Dados:** MongoDB (com `mongodb-legacy`)
* **Ambiente:** dotenv (para gerenciamento de variáveis de ambiente)

---

## 🚀 Como Executar Localmente

1.  **Clone este repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO_GIT>
    cd <NOME_DA_PASTA>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Crie seu arquivo de ambiente (`.env`):**
    * Crie um arquivo chamado `.env` na raiz do projeto.
    * Dentro dele, adicione sua string de conexão do MongoDB Atlas. (Você pode obtê-la no painel do MongoDB Atlas, em "Connect" -> "Connect your application").

    ```.env
    DATABASE_URL=mongodb+srv://<seu_usuario>:<sua_senha>@cluster0.xxxxx.mongodb.net/teste-db?retryWrites=true&w=majority
    ```

4.  **Execute o servidor em modo de desenvolvimento:**
    * O script `"dev"` no `package.json` usa o `nodemon` para reiniciar o servidor automaticamente a cada mudança.
    ```bash
    npm run dev
    ```

5.  **Acesse o projeto:**
    * Abra seu navegador e acesse `http://localhost:3000` (ou a porta que você definiu).

---

## ☁️ Publicando na Internet (Deploy)

Este projeto é um **serviço web dinâmico** e foi publicado usando o **Render.com**.

### Parte 1: Instruções de Deploy (Render.com)

1.  **Crie uma Conta:** Vá ao [Render.com](https://render.com/) e crie uma conta (recomenda-se usar "Login with GitHub").
2.  **Novo Serviço:** No seu painel, clique em **"New +"** -> **"Web Service"**.
3.  **Conecte o Repositório:** Conecte sua conta do GitHub e selecione o repositório deste projeto.
4.  **Preencha as Configurações:**
    * **Name:** Dê um nome único (ex: `crudlua`).
    * **Runtime:** `Node`.
    * **Build Command:** `npm install`
    * **Start Command:** `npm start` (Ele usará o script `"start": "node server.js"` do `package.json`).
5.  Clique em **"Create Web Service"**.

**AVISO:** Após o primeiro deploy, seu site **irá falhar** e mostrará um erro `502 Bad Gateway` ou `Internal Server Error`. Isso é esperado. Siga as soluções abaixo para corrigir.

---

## 🐛 Solucionando Erros Comuns de Deploy

Aqui estão as soluções para os erros que aparecerão após o passo 5 acima.

### Solução (Parte 2): Corrigindo o Erro `502 Bad Gateway`
Este erro acontece porque seu arquivo `.env` local (com a senha do banco) **não é enviado** para o Render. O servidor tenta iniciar, não encontra a `DATABASE_URL`, e "crasha".

**Como corrigir:** Você precisa adicionar sua `DATABASE_URL` manualmente no Render:

1.  No painel do seu serviço no Render, vá para a aba **"Environment"**.
2.  Em "Environment Variables", clique em **"Add Environment Variable"**.
3.  Preencha os campos:
    * **Key:** `DATABASE_URL`
    * **Value:** `mongodb+srv://<seu_usuario>:<sua_senha>@cluster0.xxxxx.mongodb.net/teste-db?retryWrites=true&w=majority` (cole sua string de conexão completa aqui)
4.  Clique em "Save Changes". O Render fará o deploy (publicação) novamente.



---

### Solução (Parte 3): Corrigindo Erros de `Connection Timed Out`
Após corrigir o erro 502, seu app ainda pode não conectar. Isso acontece porque o **Firewall do MongoDB** está bloqueando conexões externas.

**Como corrigir:** Você precisa autorizar os IPs do Render a se conectarem:

1.  **Encontre os IPs do Render:**
    * No painel do seu serviço no Render, vá para a aba **"Connect"**.
    * Procure pela seção **"Outbound IP Addresses"** e copie todos os IPs da lista.

2.  **Adicione os IPs no MongoDB Atlas:**
    * Acesse seu painel no **MongoDB Atlas**.
    * No menu lateral, vá para **"Network Access"**.
    * **Exclua** a regra insegura `0.0.0.0/0` (Allow Access from Anywhere), se ela existir.
    * Clique em **"Add IP Address"**.
    * Cole **cada IP** que você copiou do Render. Adicione um "Comment" (ex: "Render Service") para se organizar.
    * Clique em "Confirm".



Após salvar as variáveis de ambiente no Render e os IPs no MongoDB, seu site deve "acordar" e funcionar perfeitamente.
