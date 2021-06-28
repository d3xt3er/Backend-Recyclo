const express = require('express');
const router = express.Router();
const controller = require('../controllers/empresaController')

router.get('/login/:razao/:senha', controller.get);
router.get('/:id', controller.getCompanyById);
router.post('/criar', controller.post);
router.put('/alterar', controller.put);
router.delete('/deletar', controller.delete);



module.exports = router;