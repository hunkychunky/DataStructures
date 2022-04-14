const { authService, tokenService, adminService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.adminLogin(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const dashboard = catchAsync(async (req, res) => {
  const data = await adminService.dashboard();
  res.send(data);
});

const fetchAllSellers = catchAsync(async (req, res) => {
  const data = await adminService.fetchAllSellers(req.query.page);
  res.send(data);
});

const fetchAllShops = catchAsync(async (req, res) => {
  const data = await adminService.fetchAllShops(req.query.page);
  res.send(data);
});

const fetchAllTransactions = catchAsync(async (req, res) => {
  const data = adminService.fetchAllTransactions(req.query.page);
  res.send(await data);
});

module.exports = {
  login,
  dashboard,
  fetchAllSellers,
  fetchAllShops,
  fetchAllTransactions,
};
