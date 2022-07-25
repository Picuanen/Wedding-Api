const express = require('express');
const router = express.Router();
// contr;
<<<<<<< HEAD
=======
// router.use('/event', require('./event.route'));
>>>>>>> 9989752 ([UPDATE] create templates)
router.use('/templates', require('./template.route'));
router.use('/layouts', require('./layout.route'));

module.exports = router;
