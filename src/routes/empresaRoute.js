const express = require('express');
const router = express.Router();
const controller = require('../controllers/empresaController')

router.get('/company/:email/:senha', controller.getCompany);
router.post('/ponto/criar', controller.point);
router.get('/ponto/:email/:senha', controller.getPoint);
router.get('/ponto', controller.getAllPoint);
router.put('/ponto/alterar', controller.putPoint);
router.get('/:id', controller.getCompanyById);
router.post('/criar', controller.post);
router.put('/alterar', controller.put);
router.delete('/deletar/ponto/', controller.deletePoint);
router.delete('/deletar', controller.delete);
router.get('/editar/:email', controller.verifyCompany);
router.put('/password', controller.putPassword);


module.exports = router;