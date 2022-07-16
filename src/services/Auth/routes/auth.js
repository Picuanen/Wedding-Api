const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> 49b649c ([UPDATE] permission name)

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/refresh-token', controller.refreshToken);
<<<<<<< HEAD
>>>>>>> 320f166 ([UPDATE] permission name)
=======
const authMiddleware = require('../../../middlewares/auth.middleware');
const grantAccess = require('../../../middlewares/permission.middleware');
const permission = require('../../../constants/permissions');
router.post('/login', controller.login);
router.post('/register', controller.register);
=======
const authMiddleware = require('../../../middlewares/auth.middleware');
const grantAccess = require('../../../middlewares/permission.middleware');
const permission = require('../../../constants/permissions');
router.post('/login', controller.login);
router.post('/register', controller.register);
>>>>>>> 545eea4 ([UPDATE] middleware auth and permission)
router.get(
  '/refresh-token',
  authMiddleware,
  grantAccess({ permission: permission.SEND.GIFT }),
  controller.refreshToken
);
router.get('/logout', authMiddleware, controller.logout);
<<<<<<< HEAD
>>>>>>> 7eea433 ([UPDATE] middleware auth and permission)
=======
>>>>>>> 49b649c ([UPDATE] permission name)
=======
>>>>>>> 545eea4 ([UPDATE] middleware auth and permission)

module.exports = router;
