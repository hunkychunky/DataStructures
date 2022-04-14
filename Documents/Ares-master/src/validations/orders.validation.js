const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  shop: Joi.object().keys({
    id: Joi.custom(objectId),
  }),
  body: Joi.object().keys({
    customer: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    }),
    transaction: Joi.object().keys({
      amount: Joi.number().required(),
      ref: Joi.string().required(),
    }),
    order: Joi.object().keys({
      cart: Joi.array().items({
        product: Joi.custom(objectId).required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
        variant: Joi.string(),
      }),
      delivery_address: Joi.string(),
    }),
  }),
};

const fetchAll = {
  params: Joi.object().keys({
    id: Joi.custom(objectId),
  }),
  query: Joi.object().keys({
    page: Joi.number(),
  }),
};

const fetchOne = {
  params: Joi.object().keys({
    id: Joi.custom(objectId),
  }),
};

const updateOne = {
  params: Joi.object().keys({
    id: Joi.custom(objectId),
  }),
  body: Joi.object().keys({
    status: Joi.string(),
  }),
};

const deleteOne = {
  params: Joi.object().keys({
    id: Joi.custom(objectId),
  }),
};

const filter = {
  params: Joi.object().keys({
    id: Joi.custom(objectId),
  }),
  query: Joi.object().keys({
    search: Joi.string(),
    page: Joi.number(),
    to: Joi.string(),
    from: Joi.string(),
    status: Joi.string(),
  }),
};

const deleteMultiple = {
  body: Joi.object().keys({
    orderIds: Joi.array().items(Joi.custom(objectId)),
  }),
};

module.exports = {
  create,
  fetchAll,
  fetchOne,
  updateOne,
  deleteOne,
  filter,
  deleteMultiple,
};
