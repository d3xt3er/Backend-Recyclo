const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController')

router.get('/login/:email/:senha', controller.get);
router.get('/user/:email/:senha', controller.getUser);
router.get('/:id', controller.getUserById);
router.post('/criar', controller.postUser);
router.put('/alterar', controller.put);
router.delete('/deletar', controller.delete);

// Denuncias
router.get('/denuncias/:nome/:senha', controller.getReport);
// router.post('/criar/denuncia', controller.postReport);
// router.put('/alterar/denuncia', controller.putReport);
// router.delete('/deletar/denuncia', controller.deleteReport);



module.exports = router;