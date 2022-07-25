const { Router } = require('express');
const router = Router();
router.use('/', require('../services/Auth/routes'));
router.use('/components', require('../services/Components/routes'));
router.use('/auth', require('../services/Auth/routes'));
module.exports = router;
