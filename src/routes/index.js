const { Router } = require('express');
const router = Router();

router.use('/auth', require('../services/Auth/routes'));
router.use('/media', require('../services/Media/routes'));
router.use('/components', require('../services/Components/routes'));
router.use('/events', require('../services/Events/routes'));
router.use('/services', require('../services/Service/routes'));
router.use('/orders', require('../services/Orders/routes'));
module.exports = router;
