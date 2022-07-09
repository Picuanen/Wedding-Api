const logger = require('../../utils/logger');

const mongoose = require('mongoose');
const dbConfig = require('./dbConfig');

module.exports = function connect() {
  mongoose.connect(
    dbConfig.dbUrl,
    {
      useNewUrlParser: true,
    },
    (err) => {
      if (err) {
        logger.error(err);
      }

      logger.info('[DB] Connected to MongoDB');
    }
  );
};
