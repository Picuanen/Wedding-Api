const httpCodes = require('../constants/httpCodes');
module.exports = function (options) {
  return async function (req, res, next) {
    try {
      const user = req.user;
      const { permission, role } = options;
      const isCan = user.role.permissions.find((item) => item === permission);
      if (!isCan) return response(res, httpCodes.UNAUTHORIZED, 'You do not have permission to access this page.');
      return next();
    } catch (error) {
      next(error);
    }
  };
};
