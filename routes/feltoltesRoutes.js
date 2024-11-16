const express = require('express');
const router = express.Router();
const FeltoltesController = require('../controllers/feltoltesController');

// Az új feladat feltöltése
router.post('/upload', FeltoltesController.uploadFeladat);

module.exports = router;
