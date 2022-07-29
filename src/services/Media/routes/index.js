const express = require('express');
const { upload } = require('../../../utils/storage');
const router = express.Router();
const controller = require('../controllers/media.controller');

router.get('/', controller.index);
router.get('/get_media/:id', controller.getImage);
// router.get('/:id', controller.show);
router.post('/', controller.store);
router.delete('/:id', controller.destroy);

module.exports = router;
