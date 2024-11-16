const express = require('express');
const router = express.Router();
const FeladatokController = require('../controllers/feladatokController');

router.get('/tema/:f_tema', FeladatokController.getFeladatokByTema);
router.get('/id/:f_id', FeladatokController.getFeladatById);

module.exports = router;
