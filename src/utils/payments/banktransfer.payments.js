const { core } = require('../../config/midtrans/intance');

module.exports = async ({ parameter, grossAmount, orderId }) => {
  const parameters = {
    payment_type: parameter.type,
    transaction_details: { gross_amount: grossAmount, order_id: orderId },
    bank_transfer: { bank: parameter.bank },
  };
};
