const express = require('express');
const router = express.Router();
const drawController = require('../controllers/drawController');

router.post('/run', drawController.runDraw);
router.get('/results', drawController.drawResults);

module.exports = router;
