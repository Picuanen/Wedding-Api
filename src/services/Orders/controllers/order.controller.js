const payment = require('../../../utils/payments');
const Order = require('../models/order.model');
const response = require('../../../utils/response');
const httpCodes = require('../../../constants/httpCodes');
module.exports = {
  index: async (req, res) => {
    try {
      const orders = await Order.find().populate('services').populate('credit');
      return response(res, httpCodes.OK, 'Success Get All Orders', orders);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  payment: async (req, res) => {
    try {
      // const { card_number, card_exp_month, card_exp_year, card_cvv } = req.body;
      const order = await Order.findById(req.params.id);
      const paymentData = await payment.creditCard({
        parameter: req.body,
        grossAmount: order.totalPrice,
        orderId: req.params.id,
      });
      if (paymentData.status_code == '406') return response(res, 406, paymentData.data.status_message);
      order.type = 'success';
      await order.save();
      response(res, 200, paymentData.status_message, {
        order_id: paymentData.order_id,
        bank: paymentData.bank,
        currency: paymentData.currency,
        gross_amount: paymentData.gross_amount,
        card_type: paymentData.card_type,
        transaction_time: paymentData.transaction_time,
      });
    } catch (err) {
      console.log(err);
      return response(res, 500, err.message);
    }
  },
  store: async (req, res) => {
    try {
      const { services } = req.body;
      if (!services) return response(res, 400, 'services is required');
      const order = await Order.create({ services });
      let price = 0;
      const orderServices = await order.populate('services');
      orderServices.services.forEach((service) => (price += service.price));
      order.totalPrice = price;
      await order.save();
      response(res, 200, 'Order created', order);
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).reduce(
          (errors, key) => (errors[key] = err.errors[key].message) && errors,
          {}
        );
        return response(res, 400, 'Validation Error', errors);
      }
      console.log(err);
      response(res, 500, 'Internal Server Error', err);
      // res.status(500).json(err);
    }
  },
};
