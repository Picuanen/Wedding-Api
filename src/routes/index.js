const { Router } = require('express');
const router = Router();
router.use('/', require('../services/Auth/routes'));
<<<<<<< HEAD
router.use('/media', require('../services/Media/routes'));
=======
>>>>>>> 9989752 ([UPDATE] create templates)
router.use('/components', require('../services/Components/routes'));
router.use('/auth', require('../services/Auth/routes'));
router.use('/media', require('../services/media/routes'));
router.use('/', require('../services/Auth/routes'));
router.use('/components', require('../services/Components/routes'));
module.exports = router;
