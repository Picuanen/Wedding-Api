const express = require('express');
const router = express.Router();
const controller = require('../controllers/permission.controller');

router.get('/', controller.all);
module.exports = router;
