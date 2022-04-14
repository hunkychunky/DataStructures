const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createShop = {
  body: Joi.object().keys({
    store_name: Joi.string().required(),
    store_address: Joi.string(),
    store_domain_name: Joi.string().required(),
    store_email: Joi.string(),
    store_phone: Joi.string(),
    description: Joi.string(),
    logo: Joi.string(),
  }),
};

const viewShop = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

const editShop = {
  body: Joi.object().keys({
    store_name: Joi.string(),
    store_address: Joi.string(),
    description: Joi.string(),
    logo: Joi.string(),
    store_email: Joi.string(),
    store_phone: Joi.string(),
    headline: Joi.string(),
    header_images: Joi.array().items(Joi.string()),
    selected_template: Joi.string(),
    store_domain_name: Joi.string(),
    twitter_link: Joi.string(),
    instagram_link: Joi.string(),
    facebook_link: Joi.string(),
    page_layout: Joi.number(),
    delivery_settings: Joi.object().keys({
      setting_type: Joi.string().valid('standard', 'by-state'),
      standard_price: Joi.number(),
      prices_by_state: Joi.array().items(
        Joi.object().keys({
          state: Joi.string(),
          price: Joi.number(),
        })
      ),
      bankAccount: Joi.custom(objectId),
    }),
  }),
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

const fetchByDomainName = {
  params: Joi.object().keys({
    domain_name: Joi.string().required(),
  }),
};

const deleteShop = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

const dashboardCharts = {
  params: Joi.object().keys({
    shopId: Joi.required().custom(objectId),
  }),
  query: Joi.object().keys({
    datetype: Joi.string().required(),
  }),
};

module.exports = {
  createShop,
  editShop,
  viewShop,
  fetchByDomainName,
  deleteShop,
  dashboardCharts,
};
