const express = require('express');
const router = express.Router();
const controller = require('../controllers/empresaController')

router.get('/login/:nome/:senha', controller.get);
router.get('/company/:nome/:senha', controller.getCompany);
router.get('/:id', controller.getCompanyById);
router.post('/criar', controller.post);
router.put('/alterar', controller.put);
router.delete('/deletar', controller.delete);



module.exports = router;