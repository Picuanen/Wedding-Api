const express = require('express');
const router = express.Router();

router.use('/', require('./auth'));
router.use('/permissions', require('./permissions'));
module.exports = router;
