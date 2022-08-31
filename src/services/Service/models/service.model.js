const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    // required: true,
    default: '-',
  },
  price: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
    default: Date.now,
  },
});
Schema.options.toJSON = {
  transform: function (doc, ret, options) {
    return {
      id: ret._id,
      name: ret.name,
      description: ret.description,
      price: ret.price,
      created_at: ret.created_at,
      updated_at: ret.updated_at,
    };
  },
};
module.exports = mongoose.model('Service', Schema);
