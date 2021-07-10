const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController')

router.get('/login/:nome/:senha', controller.get);
router.get('/user/:nome/:senha', controller.getUser);
router.get('/:id', controller.getUserById);
router.post('/criar', controller.post);
router.put('/alterar', controller.put);
router.delete('/deletar', controller.delete);



module.exports = router;