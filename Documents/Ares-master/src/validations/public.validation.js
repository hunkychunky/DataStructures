const Joi = require('joi');
const { objectId } = require('./custom.validation');

const filterProduct = {
    query: Joi.object().keys({

        shop: Joi.string().custom(objectId),
        
        popular: Joi.object({
           limit: Joi.number(),
           orderBy: Joi.string().valid("aesc", "desc").default('aesc'),
        }),
        categories: Joi.object({
            limit: Joi.number(),
            orderBy: Joi.string().valid("aesc", "desc").default('aesc'),
        }),
        newArrivals: Joi.object({
            limit: Joi.number(),
            orderBy: Joi.string().valid("aesc", "desc").default('aesc'),
        })
    }),
};

module.exports = {
    filterProduct
};