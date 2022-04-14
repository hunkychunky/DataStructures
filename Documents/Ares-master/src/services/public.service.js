const { Products } = require('../models');
// const ApiError = require('../utils/ApiError');
const { Categories} = require('.../models');

// const { SHOPPRODUCTTYPE } = require('../utils/constants');

const fetchProductsFromShopForStore = async (query) => {
  const [category, newArrivals, popular] = await Promise.all(
    [
        this.category(query.shopId, query.categories.orderby, query.categories.limit),
        this.newArrivals(query.shopId, query.newArrivals.orderby, query.newArrivals.limit),
        this.popular(query.shopId, query.popular.orderby, query.popular.limit)
    ]
)
  return {
        category,
        newArrivals,
        popular
  }
};

const category = async (shopId = undefined, orderBy = 'asc', limit = 20) => {
  return await Categories.find({ ...(shopId ? {shop: shopId} : {})}).sort({ category: orderBy}).limit(limit);  
};

const newArrivals = (shopId = undefined, orderBy = 'asc', limit = 20) => {
  return await Products.find({ ...(shopId ? {shop: shopId} : {}), displayInStore: true}).sort({ createdAt: orderBy}).limit(limit);
};

const popular = (shopId = undefined, orderBy = 'asc', limit = 20) => {
  return await Products.find({ ...(shopId ? {shop: shopId} : {}), displayInStore: true}).sort({ salesCount: orderBy}).limit(limit);
};

module.exports ={
  category,
  newArrivals,
  popular,
  fetchProductsFromShopForStore,
}