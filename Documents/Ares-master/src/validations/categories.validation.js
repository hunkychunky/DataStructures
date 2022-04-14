const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    category: Joi.string().required(),
    belongsTo: Joi.custom(objectId),
    storeId: Joi.custom(objectId).required(),
  }),
};

const fetch = {
  params: Joi.object().keys({
    id: Joi.custom(objectId),
  }),
  query: Joi.object().keys({
    page: Joi.number().required(),
    primaryId: Joi.custom(objectId),
  }),
};

const update = {
  params: Joi.object().keys({
    id: Joi.custom(objectId),
  }),
  body: Joi.object().keys({
    category: Joi.string(),
    belongsTo: Joi.custom(objectId),
    storeId: Joi.custom(objectId),
  }),
};

const one = {
  params: Joi.object().keys({
    id: Joi.custom(objectId),
  }),
};

const list = {
  body: Joi.object().keys({
    categories: Joi.array().items(Joi.custom(objectId)),
  }),
};

module.exports = {
  create,
  fetch,
  update,
  one,
  list,
};
