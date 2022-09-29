const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    default: 'pendding',
    enum: ['pendding', 'success', 'failed'],
  },
  services: {
    ref: 'Service',
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },

  totalPrice: {
    type: Number,
    // required: true,
    default: 0,
  },
  credit: {
    type: {
      card_number: String,
      card_cvv: String,
      card_exp_month: String,
      card_exp_year: String,
    },
    // ref: 'Card',
    default: {},
    // required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
OrderSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    return {
      id: ret._id,
      type: ret.type,
      totalPrice: ret.totalPrice,
      user: ret.user,
      credit: ret.credit,
      services: ret.services,
      created_at: ret.createdAt,
    };
  },
};
// OrderSchema.virtual('services', {
//   ref: 'Service',
//   localField: '_id',
//   foreignField: 'serviceId',
// });

module.exports = mongoose.model('Order', OrderSchema);
