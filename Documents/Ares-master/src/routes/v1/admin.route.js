const express = require('express');

const { adminController } = require('../../controllers');

const router = express.Router();

router.post('/login', adminController.login);
router.get('/dashboard', adminController.dashboard);
router.get('/sellers', adminController.fetchAllSellers);
router.get('/shops', adminController.fetchAllShops);
router.get('/transactions', adminController.fetchAllTransactions);
module.exports = router;
