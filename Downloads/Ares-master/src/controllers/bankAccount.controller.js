const httpStatus = require('http-status');
const { bankAccountService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const create = catchAsync(async (req, res) => {
  await bankAccountService.create(req.body, req.user.id);
  res.status(httpStatus.CREATED).send();
});

const fetch = catchAsync(async (req, res) => {
  const bankAccounts = await bankAccountService.fetchBankAccount(req.user.id);
  res.send(bankAccounts);
});

const deleteBankAccount = catchAsync(async (req, res) => {
  await bankAccountService.deleteBankAccount(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  create,
  fetch,
  deleteBankAccount,
};
