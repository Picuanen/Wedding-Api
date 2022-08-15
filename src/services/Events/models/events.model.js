const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  man_bride: {
    type: Object,
    required: true,
  },
  woman_bride: {
    type: Object,
    required: true,
  },
  media: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
  },
});
Schema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
};

module.exports = mongoose.model('Events', Schema);
