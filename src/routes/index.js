const { Router } = require('express');
const router = Router();

router.use('/', require('../services/Auth/routes'));
router.use('/media', require('../services/Media/routes'));
router.use('/components', require('../services/Components/routes'));
router.use('/events', require('../services/Events/routes'));

module.exports = router;
