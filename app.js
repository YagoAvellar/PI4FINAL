const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Configuração do middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minutos
}));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.send(`
  <!-- views/index.ejs -->
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Adoção de Pets</title>
    <link rel="stylesheet" href="/css/styles.css">
  </head>
  <body>
    <h1>Bem-vindo ao Sistema de Adoção de Pets</h1>
    <p><a href="/auth/login">Faça login para continuar</a></p>
  </body>
  </html>
  
  `);
});
// Rotas
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/interested', require('./routes/interested'));
app.use('/pet', require('./routes/pet'));
app.use('/adoption', require('./routes/adoption'));

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
