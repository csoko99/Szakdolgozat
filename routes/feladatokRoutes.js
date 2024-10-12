const express = require('express');
const router = express.Router();
const FeladatokController = require('../controllers/feladatokController');

router.get('/:f_tema', FeladatokController.getFeladatokByTema);

module.exports = router;
