const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    shop: Joi.custom(objectId).required(),
    product_name: Joi.string().required(),
    product_description: Joi.string().required(),
    product_properties: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        description: Joi.string(),
      })
    ),
    images: Joi.array().required(),
    product_variants: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        values: Joi.array(),
      })
    ),
    price: Joi.number().required(),
    discount_price: Joi.number(),
    cost_price: Joi.number(),
    in_stock: Joi.boolean(),
    stock_unit: Joi.string(),
    sku: Joi.string(),
    stock_quantity: Joi.string(),
    categories: Joi.array().items(Joi.string()),
  }),
};

const fetchProducts = {
  query: Joi.object().keys({
    page: Joi.number().integer(),
    shop: Joi.string().custom(objectId),
  }),
};

const fetchOne = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const edit = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    product_name: Joi.string().required(),
    product_description: Joi.string().required(),
    product_properties: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        description: Joi.string(),
      })
    ),
    images: Joi.array().required(),
    product_variants: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        values: Joi.array(),
      })
    ),
    price: Joi.number(),
    discount_price: Joi.number(),
    cost_price: Joi.number(),
    in_stock: Joi.boolean(),
    stock_unit: Joi.string(),
    sku: Joi.string(),
    stock_quantity: Joi.string(),
    categories: Joi.array().items(Joi.string()),
  }),
};

const deleteList = {
  body: Joi.object().keys({
    products: Joi.array().items(Joi.custom(objectId)),
  }),
};

const deleteProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const filterProduct = {
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

const deleteImages = {
  body: Joi.object().keys({
    imageIds: Joi.array().items(Joi.string()),
  }),
};

module.exports = {
  create,
  edit,
  fetchOne,
  fetchProducts,
  deleteProduct,
  filterProduct,
  deleteList,
  deleteImages,
};
