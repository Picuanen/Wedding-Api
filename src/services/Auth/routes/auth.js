const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
<<<<<<< HEAD
<<<<<<< HEAD
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
=======

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/refresh-token', controller.refreshToken);
>>>>>>> 320f166 ([UPDATE] permission name)
=======
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
>>>>>>> 7eea433 ([UPDATE] middleware auth and permission)

module.exports = router;
