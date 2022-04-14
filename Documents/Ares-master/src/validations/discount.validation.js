const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    discountCode: Joi.string(),
    percentOff: Joi.boolean().required(),
    discountAmount: Joi.number().required(),
    useLimit: Joi.number().required(),
    useCount: Joi.number().required(),
    discountStatus: Joi.boolean(),
    startTime: Joi.date().min('now'),
    expiryTime: Joi.date().max().required(),
  }),
};

const fetchOne = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const fetchDiscountCode = {
  query: Joi.object().keys({
    page: Joi.number().integer(),
  }),
};

const edit = {
  body: Joi.object().keys({
    discountCode: Joi.string().required(),
    percentOff: Joi.boolean().required(),
    discountAmount: Joi.number().required(),
    useLimit: Joi.number().required(),
    useCount: Joi.number().required(),
    discountStatus: Joi.boolean().required(),
    startTime: Joi.date().min('now').required(),
    expiryTime: Joi.date().min('now').required(),
  }),
};

const filterDiscount = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  query: Joi.object().keys({
    to: Joi.string(),
    from: Joi.string(),
    search: Joi.string(),
    page: Joi.number(),
  }),
};

const deleteDiscount = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  create,
  fetchOne,
  fetchDiscountCode,
  edit,
  filterDiscount,
  deleteDiscount,
};
