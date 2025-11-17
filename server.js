const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// (IMPORTANTE) Verifique se a variável de ambiente está carregando
const uri = process.env.DATABASE_URL;
if (!uri) {
    console.error("Erro: DATABASE_URL não foi definida. Verifique seu .env ou as variáveis de ambiente no Render.");
    process.exit(1);
}

const { MongoClient, ObjectId } = require('mongodb-legacy'); // Corrigido

// Configurações do App (Podem ficar no topo)
app.set('views', './views');
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

// Crie o cliente
const client = new MongoClient(uri);

// Declare as variáveis do DB para que fiquem acessíveis
let db;
let collection;

// (NOVO) Função assíncrona para iniciar o servidor e conectar ao DB
async function startServer() {
    try {
        // 1. Conecte-se ao MongoDB
        await client.connect();
        console.log("Conectado ao MongoDB com sucesso!");

        // 2. Defina o 'db' e 'collection' APÓS conectar
        db = client.db("teste-db");
        collection = db.collection('crud');

        // 3. Mova TODAS as suas rotas para DENTRO desta função
        //    (Para que elas só existam se o DB estiver conectado)

        app.get("/ler", (requisition, resposta) => {
            resposta.send("olá gente!");
        });

        app.get("/emmet", (req, res) => {
            res.render("indexEmmet.ejs");
        });

        app.get("/index", (req, res) => {
            res.render("index.ejs");
        });

        // Rota principal agora redireciona para /show
        app.get('/', (req, res) => {
            res.redirect('/show');
        });

        //criar no nosso banco de dados do mongodb
        app.post("/show", (req, res) => {
            collection.insertOne(req.body, (err, result) => {
                if (err) return console.log(err);
                console.log("SALVOU COM SUCESSO NO NOSSO BANCO DE DADOS");
                res.redirect("/show");
            });
        });

        //renderizar e retornar o conteúdo do nosso banco
        app.get('/show', (req, res) => {
            collection.find().toArray((err, results) => {
                if (err) return console.log(err);
                res.render('show.ejs', { crud: results });
            });
        });

        //criando a nossa rota e comandos para editar
        app.route('/edit/:id')
            .get((req, res) => {
                var id = req.params.id;

                // (CORRIGIDO) Use findOne para buscar por ID.
                // 'find().toArray()' retorna um array, 'findOne' retorna o objeto direto.
                db.collection('crud').findOne({ _id: ObjectId(id) }, (err, result) => {
                    if (err) return res.send(err);
                    res.render('edit.ejs', { crud: result });
                });
            })
            .post((req, res) => {
                var id = req.params.id;
                var name = req.body.name;
                var surname = req.body.surname;

                db.collection('crud').updateOne({ _id: ObjectId(id) }, {
                    $set: {
                        name: name,
                        surname: surname
                    }
                }, (err, result) => {
                    if (err) return res.send(err);
                    res.redirect('/show');
                    console.log('Banco de dados atualizado');
                });
            });

        //criando a nossa rota e comandos para deletar
        app.route('/delete/:id')
            .get((req, res) => {
                var id = req.params.id;

                db.collection('crud').deleteOne({ _id: ObjectId(id) }, (err, result) => {
                    if (err) return res.send(500, err);
                    console.log('Deletando do nosso banco de dados!');
                    res.redirect('/show');
                });
            });

        // Esta rota 'app.put' parecia ser um duplicata ou erro,
        // pois você já tem uma rota de edição acima.
        // Se precisar dela, pode descomentar.
        /*
        app.put('/updateuser/:id', function(req, res) {
            var db = req.db; // 'req.db' não está definido, você usaria o 'db' global
            var userToUpdate = req.params.id;
            db.collection('userlist').update({ _id: ObjectId(userToUpdate)}, req.body, function (err, result) {
                res.send(
                    (err === null) ? {msg: ''} : {msg: err}
                );
            });
        });
        */


        // 4. Mova o app.listen para DENTRO desta função
        const PORT = process.env.PORT || 3000;
        const HOST = '0.0.0.0';
        app.listen(PORT, HOST, () => {
            console.log(`Servidor rodando em http://${HOST}:${PORT}`);
        });

    } catch (err) {
        // Se a conexão com o DB falhar, o app não inicia.
        console.error("Falha ao conectar ao banco de dados", err);
        process.exit(1); // Encerra o processo com erro
    }
}

// 5. Chame a função para iniciar tudo
startServer();
