const { Router } = require('express');
const router = Router();

router.use('/auth', require('../services/Auth/routes'));
router.use('/media', require('../services/Media/routes'));
router.use('/components', require('../services/Components/routes'));
module.exports = router;
