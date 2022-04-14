const Queue = require('bull');
const logger = require('../../config/logger');
const { BankAccount } = require('../../models');
const { createSubAccount } = require('../../helpers/paystack.helper');

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const subaccountQueue = new Queue('createSubaccountCode', REDIS_URL);

subaccountQueue.process(async (job, done) => {
  try {
    const result = await createSubAccount(job.data.businessName, job.data.bankCode, job.data.accountNumber);

    if (result.data && result.data.subaccount_code) {
      await BankAccount.findByIdAndUpdate(job.data.id, {
        subAccountCode: result.data.subaccount_code,
      });
      done();
    }
  } catch (e) {
    logger.error(e);
  }
});

module.exports = subaccountQueue;
