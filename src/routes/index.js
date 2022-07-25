const { Router } = require('express');
const router = Router();
router.use('/auth', require('../services/Auth/routes'));
router.use('/media', require('../services/media/routes'));
module.exports = router;
