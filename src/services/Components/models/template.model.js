const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color_pallet: {
    type: Array,
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
      title: ret.title,
      description: ret.description,
      color_pallet: ret.color_pallet,
      created_at: ret.created_at,
      updated_at: ret.updated_at,
    };
  },
};

module.exports = mongoose.model('Template', Schema);
