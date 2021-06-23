const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

//Rotas
const index = require('./src/routes/index');
const usuarioRoute = require('./src/routes/usuarioRoute');
const empresaRoute = require('./src/routes/empresaRoute');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', index);

app.use(cors());
app.use('/usuario', usuarioRoute);
app.use('/empresa', empresaRoute);


module.exports = app;