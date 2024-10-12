const express = require('express');
const router = express.Router();
const TankonyvekController = require('../controllers/tankonyvekController');

router.get('/', TankonyvekController.getAll);
router.get('/:tk_nev/temak', TankonyvekController.getTemak);

module.exports = router;
