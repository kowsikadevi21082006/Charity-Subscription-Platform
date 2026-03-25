const express = require('express');
const router = express.Router();
const scoresController = require('../controllers/scoresController');

router.get('/', scoresController.getScores);
router.post('/', scoresController.addScore);

module.exports = router;
