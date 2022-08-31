const Service = require('../models/service.model');
const response = require('../../../utils/response');
const httpCode = require('../../../constants/httpCodes');
module.exports = {
  index: async (req, res) => {
    try {
      const services = await Service.find();
      return response(res, httpCode.OK, 'Success get All Service', services);
    } catch (error) {
      return response(res, httpCode.INTERNAL_SERVER_ERROR, 'Error get All Service', error);
    }
  },
  store: async (req, res) => {
    try {
      let service = await Service.findOne({ name: req.body.name });
      if (service)
        return response(res, httpCode.BAD_REQUEST, 'Service already exist', { name: 'Service already exist' });
      service = await Service.create(req.body);
      return response(res, httpCode.OK, 'Success create Service', service);
    } catch (error) {
      console.log(error);
      if (error.name == 'ValidationError') {
        const errors = Object.keys(error.errors).map((key) => ({ [key]: error.errors[key].message }));
        return response(res, httpCode.BAD_REQUEST, 'Validation Error', errors);
      }

      return response(res, httpCode.INTERNAL_SERVER_ERROR, 'Error create Service', error);
    }
  },
  update: async (req, res) => {
    try {
      const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!service) return response(res, httpCode.NOT_FOUND, 'Service not found');
      return response(res, httpCode.OK, 'Success update Service', service);
    } catch (error) {
      if (error.name == 'ValidationError') {
        const errors = Object.keys(error.errors).map((key) => ({ [key]: error.errors[key].message }));
        return response(res, httpCode.BAD_REQUEST, 'Validation Error', errors);
      }

      return response(res, httpCode.INTERNAL_SERVER_ERROR, 'Error update Service', error);
    }
  },
  destroy: async (req, res) => {
    try {
      const service = await Service.findByIdAndRemove(req.params.id);
      if (!service) return response(res, httpCode.NOT_FOUND, 'Service not found');
      return response(res, httpCode.OK, 'Success delete Service', service);
    } catch (error) {
      return response(res, httpCode.INTERNAL_SERVER_ERROR, 'Error delete Service', error);
    }
  },
};
