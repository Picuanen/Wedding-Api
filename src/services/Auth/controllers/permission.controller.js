const response = require('../../../utils/response');
const permission = require('../../../constants/permissions');
module.exports = {
  all: async (req, res) => {
    response(res, 200, 'Get all permission success', permission);
  },
};
