const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController')

router.get('/user/:email/:senha', controller.getUser);
router.get('/:id', controller.getUserById);
router.post('/criar', controller.postUser);
router.put('/alterar', controller.put);
router.get('/editar/:email', controller.verifyUser);
router.put('/password', controller.putPassword);
router.delete('/deletar', controller.delete);

// Denuncias
router.get('/denuncias/:email/:senha', controller.getReport);
router.post('/criar/denuncia', controller.postReport);
router.put('/alterar/denuncia', controller.putReport);
router.delete('/deletar/denuncia', controller.deleteReport);



module.exports = router;