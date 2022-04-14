const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string(),
    customerNote: Joi.string(),
    shop: Joi.custom(objectId),
  }),
};

const fetch = {
  query: Joi.object().keys({
    limit: Joi.number(),
    page: Joi.number(),
  }),
  params: Joi.object().keys({
    id: Joi.custom(objectId),
  }),
};

const update = {
  params: Joi.object().keys({
    id: Joi.custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    address: Joi.string(),
    customerNote: Joi.string(),
    shop: Joi.custom(objectId),
  }),
};

const one = {
  params: Joi.object().keys({
    id: Joi.custom(objectId),
  }),
};

const deleteList = {
  body: Joi.object().keys({
    customers: Joi.array().items(Joi.custom(objectId)),
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
  }),
};

module.exports = {
  create,
  fetch,
  update,
  one,
  deleteList,
  filter,
};
