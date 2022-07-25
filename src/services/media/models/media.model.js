const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  category: {
    type: Object,
    required: true,
    enum: ['image', 'video', 'audio', 'csv'],
  },
  path: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: null,
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
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.path;
  },
};

module.exports = mongoose.model('Media', Schema);
