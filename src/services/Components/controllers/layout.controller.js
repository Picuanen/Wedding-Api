const Layout = require('../models/layout.model');
const response = require('../../../utils/response');
const httpCode = require('../../../constants/httpCodes');
module.exports = {
  index: async (req, res) => {
    try {
      const layouts = await Layout.find().populate('template').populate('events');
      response(res, httpCode.OK, 'Get all layouts success', layouts);
    } catch (err) {
      console.log(err);
      response(res, httpCode.INTERNAL_SERVER_ERROR, err);
    }
  },
  store: async (req, res) => {
    try {
      const layout = await Layout.create(req.body);
      response(res, httpCode.OK, 'Create layout success', layout);
    } catch (err) {
      if (err.name == 'ValidationError') {
        const errors = Object.keys(err.errors).map((key) => ({ [key]: err.errors[key].message }));
        return response(res, httpCode.BAD_REQUEST, 'Validation error', errors);
      }
      return response(res, httpCode.INTERNAL_SERVER_ERROR, err);
    }
  },
  update: async (req, res) => {
    try {
      const layout = await Layout.findByIdAndUpdate(req.params.id, req.body).populate('template').populate('events');
      response(res, httpCode.OK, 'Update layout success', layout);
    } catch (err) {
      if (err.name == 'CastError') return response(res, httpCode.NOT_FOUND, 'Layout not found');
      response(res, httpCode.INTERNAL_SERVER_ERROR, err);
    }
  },
  destroy: async (req, res) => {
    try {
      const layout = await Layout.findByIdAndRemove(req.params.id);
<<<<<<< HEAD
      if (!layout) return response(res, httpCode.NOT_FOUND, 'Layout not found');
=======
>>>>>>> eaa94fd ([UPDATE] create templates)
      response(res, httpCode.OK, 'Delete layout success', layout);
    } catch (err) {
      response(res, httpCode.INTERNAL_SERVER_ERROR, err);
    }
  },
};
