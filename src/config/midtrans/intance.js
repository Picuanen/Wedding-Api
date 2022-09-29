const config = require('./midtransConfig');
const midtransClient = require('midtrans-client');
module.exports = {
  core: new midtransClient.CoreApi({
    isProduction: config.isProduction,
    serverKey: config.serverKey,
    clientKey: config.clientKey,
  }),
};
