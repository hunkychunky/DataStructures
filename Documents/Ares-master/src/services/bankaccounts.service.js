const { BankAccount } = require('../models');
const { createRecipientCodeQueueService, createSubAccountQueueService } = require('../workers/queues');

/**
 * Create bank account and send to redis queue to create recipient code.
 * @param {*} body
 * @returns {Promise<BankAccount>}
 */
const create = async (body, userId) => {
  const bankAccount = await BankAccount.create({ ...body, user: userId });
  createRecipientCodeQueueService(
    bankAccount._id,
    bankAccount.bankAccountNumber,
    bankAccount.bankAccountName,
    bankAccount.bankCode
  );

  createSubAccountQueueService(
    bankAccount._id,
    bankAccount.bankAccountName,
    bankAccount.bankCode,
    bankAccount.bankAccountNumber
  );

  return bankAccount;
};

const fetchBankAccount = async (userId) => {
  const bankAccounts = await BankAccount.find({ user: userId, isDeleted: false });
  return bankAccounts;
};

const deleteBankAccount = async (id) => {
  const bankAccount = await BankAccount.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return bankAccount;
};

const updateBankAccount = async (id, payload) => {
  const bankAccount = await BankAccount.findByIdAndUpdate(id, payload, { new: true });
  return bankAccount;
};

module.exports = {
  create,
  fetchBankAccount,
  deleteBankAccount,
  updateBankAccount,
};
