const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

/**
 * Uptime monitor endpoint controller
 */
const uptime = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send();
});

module.exports = {
  uptime,
};
