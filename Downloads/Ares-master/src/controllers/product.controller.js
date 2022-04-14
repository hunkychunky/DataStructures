const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { productService, mediaService } = require('../services');
const pick = require('../utils/pick');
const logger = require('../config/logger');

const create = catchAsync(async (req, res) => {
  const data = { ...req.body, owner: req.user._id };
  const product = await productService.createProduct(data);
  return res.status(httpStatus.CREATED).send(product);
});

const edit = catchAsync(async (req, res) => {
  const product = await productService.editProduct(req.params.id, req.body);
  res.status(httpStatus.OK).send(product);
});

const fetchOne = catchAsync(async (req, res) => {
  const productOne = await productService.fetchOne(req.params.id);
  res.status(httpStatus.OK).send(productOne);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(httpStatus.OK).send({ message: 'deleted successfully' });
});

const fetchAllProducts = catchAsync(async (req, res) => {
  const { page, shop } = req.query;
  const products = await productService.fetchProducts(shop, page, req.user.id);

  res.send(products);
});

const filterAllProducts = catchAsync(async (req, res) => {
  const queryParams = pick(req.query, ['to', 'from', 'search', 'page']);
  const shopId = req.params.id;

  logger.info(JSON.stringify(queryParams));

  let filterParams = {};
  if (queryParams.to && queryParams.from) {
    filterParams = {
      // eslint-disable-next-line no-unused-vars
      createdAt: {
        $lte: new Date(queryParams.to),
        $gte: new Date(queryParams.from),
      },
    };
  }

  const products = await productService.filterProduct(shopId, queryParams.search, filterParams, queryParams.page);
  res.send(products);
});

const deleteManyProduct = catchAsync(async (req, res) => {
  await productService.deleteProduct(req.body.products);
  res.send(httpStatus.NO_CONTENT).send();
});

const deleteImage = catchAsync(async (req, res) => {
  await mediaService.deleteImageFromCloudinary(req.body.imageIds);
  res.send(httpStatus.NO_CONTENT).send();
});

module.exports = {
  create,
  edit,
  fetchOne,
  deleteProduct,
  fetchAllProducts,
  filterAllProducts,
  deleteManyProduct,
  deleteImage,
};
