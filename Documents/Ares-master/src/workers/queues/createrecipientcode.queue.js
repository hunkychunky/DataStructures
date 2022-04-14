const Queue = require('bull');
const logger = require('../../config/logger');
// const { bankAccountService } = require('../services');
const { BankAccount } = require('../../models');
const { createRecipient } = require('../../helpers/paystack.helper');

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const recipientCodeQueue = new Queue('createRecipeintCode', REDIS_URL);

recipientCodeQueue.process(async (job, done) => {
  try {
    const result = await createRecipient(job.data.accountNumber, job.data.accountName, job.data.bankCode);

    if (result.data && result.data.receipientCode) {
      await BankAccount.findByIdAndUpdate(job.data.id, {
        receipientCode: result.data.recipient_code,
      });
      done();
    }
  } catch (e) {
    logger.error(e);
  }
});

module.exports = recipientCodeQueue;
