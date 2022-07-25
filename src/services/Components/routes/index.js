const express = require('express');
const router = express.Router();
// contr;
// router.use('/event', require('./event.route'));
router.use('/templates', require('./template.route'));
router.use('/layouts', require('./layout.route'));

module.exports = router;
