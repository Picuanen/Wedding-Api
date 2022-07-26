const Template = require('../models/template.model');
const httpCode = require('../../../constants/httpCodes');
const response = require('../../../utils/response');
module.exports = {
  index: async (req, res) => {
    try {
      const templates = await Template.find();
      response(res, httpCode.OK, 'Get all templates success', templates);
    } catch (err) {
      console.log(err);
      response(res, httpCode.INTERNAL_SERVER_ERROR, err);
    }
  },
  store: async (req, res) => {
    try {
      const template = await Template.create(req.body);
      response(res, httpCode.OK, 'Create template success', template);
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
      const template = await Template.findByIdAndUpdate(req.params.id, req.body);
      response(res, httpCode.OK, 'Update template success', template);
    } catch (err) {
      console.log(err);
      response(res, httpCode.INTERNAL_SERVER_ERROR, err);
    }
  },
  destroy: async (req, res) => {
    try {
      const template = await Template.findByIdAndRemove(req.params.id);
      response(res, httpCode.OK, 'Delete template success', template);
    } catch (err) {
      response(res, httpCode.INTERNAL_SERVER_ERROR, err);
    }
  },
};
