const express = require('express');
const router = express.Router();
const controller = require('../controllers/events.controller');

router.use(require('../../../middlewares/auth.middleware'));
router.get('/', controller.index);
router.get('/me', controller.detailEventByUser);
router.post('/', controller.store);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
