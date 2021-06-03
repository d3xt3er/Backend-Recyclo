const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController')

router.get('/usuarios', controller.get);

module.exports = router;