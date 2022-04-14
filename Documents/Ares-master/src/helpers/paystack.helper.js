const axios = require('axios').default;
const logger = require('../config/logger');

const paystackurl = process.env.PAYSTACK_BASE_URL;

/**
 * Verifies a paystack payment using it's reference
 * @param {*} reference
 * @returns {Promise<T>}
 */
const verifyPayment = async (reference) => {
  try {
    const { data } = await axios.get(`${paystackurl}transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json' },
    });
    return data;
  } catch (e) {
    logger.error(e.response.data);
    return e.response.data;
  }
};

/**
 * Create a recipient from a bank
 * @param {*} accountNumber
 * @param {*} accountName
 * @param {*} bankCode
 * @returns {Promise<T>}
 */
const createRecipient = async (accountNumber, accountName, bankCode) => {
  try {
    const body = {
      type: 'nuban',
      name: accountName,
      account_number: accountNumber,
      bank_code: bankCode,
      currency: 'NGN',
    };

    const { data } = await axios.post(`${paystackurl}transferrecipient`, body, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json' },
    });

    return data;
  } catch (e) {
    logger.error(e.response.data);
    return e.response.data;
  }
};

/**
 * Verify a bank account
 * @param {*} accountNumber
 * @param {*} bankCode
 * @returns
 */
const verifyBankAccount = async (accountNumber, bankCode) => {
  try {
    const { data } = await axios.get(`${paystackurl}bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json' },
    });

    return data;
  } catch (e) {
    logger.error(e.response.data);
    return e.response.data;
  }
};

/**
 * Withdraw to a bank account
 * @param {*} recipient
 * @param {*} amount
 * @param {*} user
 * @returns {Promise<T>}
 */
const withdrawToBankAccount = async (recipient, amount, user) => {
  try {
    const body = {
      source: 'balance',
      amount,
      recipient,
      reason: `Withdrawal ${amount} to vendor: ${user.name} ${user.email}`,
    };

    const { data } = await axios.post(`${paystackurl}transfer`, body, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json' },
    });

    return data;
  } catch (e) {
    logger.error(e.response.data);
    return e.response.data;
  }
};

const createSubAccount = async (businessName, bankCode, accountNumber) => {
  try {
    const body = {
      business_name: businessName,
      bank_code: bankCode,
      account_number: accountNumber,
    };

    const { data } = await axios.post(`${paystackurl}subaccount`, body, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json' },
    });

    return data;
  } catch (e) {
    logger.error(e.response);
    return e.response;
  }
};

module.exports = {
  verifyPayment,
  createRecipient,
  withdrawToBankAccount,
  verifyBankAccount,
  createSubAccount,
};
