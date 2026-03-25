const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/users', adminController.getUsers);
router.get('/winners', adminController.getWinners);
router.patch('/winners/:id', adminController.verifyWinner);

module.exports = router;
