const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    bankName: Joi.string(),
    bankAccountName: Joi.string(),
    bankAccountNumber: Joi.string(),
    bankCode: Joi.string(),
  }),
};

const deleteBankAccount = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};
module.exports = {
  create,
  deleteBankAccount,
};
