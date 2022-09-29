const express = require('express');
const router = express.Router();
const controller = require('../controllers/order.controller');
router.get('/', controller.index);
router.post('/payment/:id', controller.payment);
router.post('/', controller.store);
module.exports = router;
