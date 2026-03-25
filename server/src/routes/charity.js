const express = require('express');
const router = express.Router();
const charityController = require('../controllers/charityController');

router.get('/', charityController.listCharities);
router.post('/select', charityController.selectCharity);

module.exports = router;
