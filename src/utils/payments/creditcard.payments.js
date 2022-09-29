const { core } = require('../../config/midtrans/intance');

module.exports = async ({ parameter, grossAmount, orderId }) => {
  try {
    const cardToken = await core.cardToken({ client_key: core.apiConfig.clientKey, ...parameter });
    const tokenId = cardToken.token_id;
    console.log(tokenId);
    const parameters = {
      payment_type: 'credit_card',
      transaction_details: { gross_amount: grossAmount, order_id: orderId },
      credit_card: { token_id: tokenId },
    };
    const response = await core.charge(parameters);
    return response;
  } catch (error) {
    console.log('Credit Card => ', error);
    return error;
  }
};
