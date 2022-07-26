const upload = require('../../../utils/upload');
const Media = require('../models/media.model');
const httpCode = require('../../../constants/httpCodes');
const path = require('path');
const fs = require('fs');
// const appDir = dirname(require.main.filename);
module.exports = {
  index: async (req, res) => {
    try {
      const medias = await Media.find();
      response(res, httpCode.OK, 'Get all medias success', medias);
    } catch (err) {
      console.log(err);
      response(res, httpCode.INTERNAL_SERVER_ERROR, err);
    }
  },
  store: async (req, res) => {
    try {
      await upload.single('media');
      const media = await Media.create({
        title: req.body.title,
        path: req.files[0].path,
        category: req.files[0].mimetype.split('/')[0],
      });
      response(res, httpCode.OK, 'Create media success', media);
    } catch (err) {
      if (err.name == 'ValidationError') {
        const errors = Object.keys(err.errors).map((key) => ({ [key]: err.errors[key].message }));
        return response(res, httpCode.BAD_REQUEST, 'Validation error', errors);
      }
      console.log(err);
      return response(res, httpCode.INTERNAL_SERVER_ERROR, 'Error', err);
    }
  },
  getImage: async (req, res) => {
    try {
      const media = await Media.findById(req.params.id);
      return res.sendFile(path.resolve(media.path));
    } catch (err) {
      if (err.name == 'CastError') return response(res, httpCode.NOT_FOUND, 'Media not found');
      response(res, httpCode.INTERNAL_SERVER_ERROR, err);
    }
  },
  destroy: async (req, res) => {
    try {
      const media = await Media.findById(req.params.id);
      if (fs.existsSync(path.resolve(media.path))) fs.unlinkSync(media.path);
      await media.remove();
      response(res, httpCode.OK, 'Delete media success', media);
    } catch (err) {
      response(res, httpCode.INTERNAL_SERVER_ERROR, err);
    }
  },
};