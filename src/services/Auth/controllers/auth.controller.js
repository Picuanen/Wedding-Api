const logger = require('../../../utils/logger');
const response = require('../../../utils/response');
const { generateToken } = require('../../../utils/token');
const User = require('../models/User');
const { httpCodes } = require('../../../constants/httpCodes');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return response(res, httpCodes.NOT_FOUND, 'User not found', null);

      const isValid = await user.comparePassword(password);
      if (!isValid) return response(res, httpCodes.UNAUTHORIZED, 'Invalid password', null);

      const refreshToken = generateToken(user, 'refresh');
      await user.update({ token: refreshToken });

      const accessToken = generateToken(user, 'access');

      res.cookie('token', refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      return response(res, httpCodes.OK, 'Login success', { user, token: accessToken });
    } catch (error) {
      console.log(error);
      logger.error(error);
      return response(res, httpCodes.INTERNAL_SERVER_ERROR, 'Login failed', null);
    }
  },
  register: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) return response(res, httpCodes.BAD_REQUEST, 'User already exists', null);

      const passwordHased = await User.hashPassword(password);
      const newUser = await User.create({ name, email, password: passwordHased });

      return response(res, httpCodes.OK, 'Register success', newUser);
    } catch (err) {
      console.log(err);
      logger.error(err);
      return response(res, httpCodes.INTERNAL_SERVER_ERROR, 'Register failed', err);
    }
  },
  refreshToken: async (req, res) => {
    const { token } = req.cookies;
    try {
      const user = await User.findOne({ token });
      if (!user) return response(res, httpCodes.UNAUTHORIZED, 'Invalid token', null);

      const accessToken = generateToken(user, 'access');
      return response(res, httpCodes.OK, 'Refresh token success', { accessToken });
    } catch (error) {
      logger.error(error);
      return response(res, httppCodes.INTERNAL_SERVER_ERROR, 'Refresh token failed', null);
    }
  },
};
