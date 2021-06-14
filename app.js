const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

//Rotas
const index = require('./src/routes/index');
const usuarioRoute = require('./src/routes/usuarioRoute');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', index);

app.use(cors());
app.use('/usuario', usuarioRoute);

module.exports = app;