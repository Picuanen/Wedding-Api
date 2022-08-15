const Events = require('../models/events.model');
const response = require('../../../utils/response');
const httpCodes = require('../../../constants/httpCodes');
module.exports = {
  index: async (req, res) => {
    try {
      const events = await Events.find();
      return response(res, httpCodes.OK, 'Success get All Events', events);
    } catch (error) {
      return response(res, httpCodes.INTERNAL_SERVER_ERROR, error);
    }
  },

  detailEventByUser: async (req, res) => {
    try {
      const events = await Events.find({ user: req.user.id }).populate('media');
      response(res, httpCodes.OK, 'Success get my Events', events);
    } catch (err) {
      response(res, httpCodes.INTERNAL_SERVER_ERROR, err);
    }
  },
  store: async (req, res) => {
    try {
      const data = req.body;
      data.user = req.user.id;
      const events = await Events.create(data);
      // const events = await Events.create(req.body);
      response(res, httpCodes.OK, 'Success', events);
    } catch (err) {
      if (err.name == 'ValidationError') {
        const errors = Object.keys(err.errors).map((key) => ({ [key]: err.errors[key].message }));
        return response(res, httpCodes.BAD_REQUEST, 'Validation error', errors);
      }
      console.log(err);
      return response(res, httpCodes.INTERNAL_SERVER_ERROR, 'Error', err);
    }
  },
  update: async (req, res) => {
    try {
      const events = await Events.findByIdAndUpdate(req.params.id, req.body);
      response(res, httpCodes.OK, 'Success Update Event', events);
    } catch (err) {
      if (err.name == 'CastError') return response(res, httpCodes.NOT_FOUND, 'Events not found');
      return response(res, httpCodes.INTERNAL_SERVER_ERROR, 'Error', err);
    }
  },
  destroy: async (req, res) => {
    try {
      const events = await Events.findByIdAndRemove(req.params.id);
      if (!events) return response(res, httpCodes.NOT_FOUND, 'Events not found');
      response(res, httpCodes.OK, 'Success', events);
    } catch (err) {
      if (err.name == 'CastError') return response(res, httpCodes.NOT_FOUND, 'Events not found');
      return response(res, httpCodes.INTERNAL_SERVER_ERROR, 'Error', err);
    }
  },
};
