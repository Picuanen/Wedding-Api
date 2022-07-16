const JWT = require('jsonwebtoken');
const config = require('../config');

module.exports = {
  /**
   * @param {any} user user data
   * @param {string} type token type
   * @returns {string} token
   *
   */
  generateToken: (user, type) => {
    const secret = type == 'access' ? config.jwt.accessTokensecret : config.jwt.refreshTokenSecret;
    const expired = type == 'access' ? '1h' : '7d';
    return JWT.sign({ user }, secret, {
      algorithm: config.jwt.algorithm,
      expiresIn: expired,
    });
  },
};
