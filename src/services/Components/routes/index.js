const express = require('express');
const router = express.Router();
router.use('/templates', require('./template.route'));
router.use('/layouts', require('./layout.route'));

module.exports = router;
