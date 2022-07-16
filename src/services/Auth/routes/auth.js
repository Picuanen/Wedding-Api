const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const authMiddleware = require('../../../middlewares/auth.middleware');
const grantAccess = require('../../../middlewares/permission.middleware');
const permission = require('../../../constants/permissions');
router.post('/login', controller.login);
router.post('/register', controller.register);
router.get(
  '/refresh-token',
  authMiddleware,
  grantAccess({ permission: permission.SEND.GIFT }),
  controller.refreshToken
);
router.get('/logout', authMiddleware, controller.logout);

module.exports = router;
