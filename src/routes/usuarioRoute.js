const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController')

router.get('/usuarios', controller.get);
router.get('/usuarios/:id', controller.getUserById);


module.exports = router;