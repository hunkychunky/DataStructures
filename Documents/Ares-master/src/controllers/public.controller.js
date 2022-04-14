const { publicService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const fetchProductsFromShopForStore = catchAsync(async (req, res) => {
  // const query = pick(req.query, ['searchType']);
  const products = await publicService.fetchProductsFromShopForStore(req.query);

  res.send(products);
});

module.exports = {
  fetchProductsFromShopForStore,
};
