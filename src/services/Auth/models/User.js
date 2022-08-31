const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
  role: {
    type: Object,
    default: {
      name: 'user',
      permissions: {},
    },
  },
  token: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

Schema.methods = {
  /**
   * compare password to hash
   * @param {String} Password
   * @returns {Promise<Bollean>}
   * @memberof User
   **/
  comparePassword: async function (password) {
    return bcrypt.compare(password, this.password);
  },
};

Schema.statics = {
  /**
   * hash Password
   * @param {String} Password
   * @returns {Promise<String>} Hased Password
   **/
  hashPassword: async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },
};
Schema.options.toJSON = {
  transform: (doc, ret) => {
    return {
      id: ret._id,
      name: ret.name,
      email: ret.email,
      role: ret.role,
      createdAt: ret.createdAt,
    };
  },
};
module.exports = mongoose.model('User', Schema);
