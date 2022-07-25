require('dotenv').config();

module.exports = {
  database: {
    ...require('./database/dbConfig'),
  },
  jwt: {
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'refreshTokenSecret',
    accessTokensecret: process.env.JWT_SECRET || 'accessTokensecret',
    algorithm: process.env.JWT_ALGO || 'HS256',
  },
};
