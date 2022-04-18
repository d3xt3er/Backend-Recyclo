const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginController');

router.get('/:email/:senha',controller.getAccount);



module.exports = router;