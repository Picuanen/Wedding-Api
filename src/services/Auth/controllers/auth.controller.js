const logger = require('../../../utils/logger');
const response = require('../../../utils/response');
const { generateToken } = require('../../../utils/token');
const User = require('../models/User');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return response(res, 404, 'User not found', null);

      const isValid = await user.comparePassword(password);
      if (!isValid) return response(res, 401, 'Invalid password', null);

      const refreshToken = generateToken(user, 'refresh');
      await user.update({ token: refreshToken });

      const accessToken = generateToken(user, 'access');

      res.cookie('token', refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      return response(res, 200, 'Login success', { user, token: accessToken });
    } catch (error) {
      console.log(error);
      logger.error(error);
      return response(res, 500, 'Login failed', null);
    }
  },
  register: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) return response(res, 400, 'User already exists', null);

      const passwordHased = await User.hashPassword(password);
      const newUser = await User.create({ name, email, password: passwordHased });

      return response(res, 201, 'Register success', newUser);
    } catch (err) {
      console.log(err);
      logger.error(err);
      return response(res, 500, 'Register failed', err);
    }
  },
  refreshToken: async (req, res) => {
    const { token } = req.cookies;
    try {
      const user = await User.findOne({ token });
      if (!user) return response(res, 401, 'Invalid token', null);

      const accessToken = generateToken(user, 'access');
      return response(res, 200, 'Refresh token success', { accessToken });
    } catch (error) {
      logger.error(error);
      return response(res, 500, 'Refresh token failed', null);
    }
  },
};
