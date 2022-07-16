const { Router } = require('express');
const router = Router();
router.use('/auth', require('../services/Auth/routes'));
module.exports = router;
