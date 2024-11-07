const express = require('express');
const router = express.Router();
const TankonyvekController = require('../controllers/tankonyvekController');

router.get('/', TankonyvekController.getAll);
router.get('/temak/:tk_id', TankonyvekController.getTemak);

module.exports = router;
