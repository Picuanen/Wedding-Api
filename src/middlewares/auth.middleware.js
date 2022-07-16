const config = require('../config');
const jwt = require('jsonwebtoken');
const response = require('../utils/response');
const httpCodes = require('../constants/httpCodes');
module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return response(res, httpCodes.UNAUTHORIZED, 'No token provided.');
  jwt.verify(token, config.jwt.accessTokensecret, (err, decoded) => {
    if (err) return response(res, httpCodes.UNAUTHORIZED, 'Failed to authenticate token.');

    req.user = decoded.user;
    next();
  });
};
