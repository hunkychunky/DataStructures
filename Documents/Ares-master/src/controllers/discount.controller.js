const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { discountService } = require('../services/discount.service');
const pick = require('../utils/pick');
const logger = require('../config/logger');

const create = catchAsync(async (req, res) => {
  const data = { ...req.body, owner: req.user.id };
  const discount = await discountService.createDiscountCode(data);
  return res.status(httpStatus.CREATED).send(discount);
});

const edit = catchAsync(async (req, res) => {
  const discounts = await discountService.editDiscountCode(req.params.id, req.body);
  res.status(httpStatus.OK).send(discounts);
});

const fetchOne = catchAsync(async (req, res) => {
  const discountOne = await discountService.fetchOne(req.params.id);
  res.status(httpStatus.OK).send(discountOne);
});

const deleteDiscountCode = catchAsync(async (req, res) => {
  await discountService.deleteDiscountCode(req.params.id);
  res.status(httpStatus.OK).send({ message: 'deleted successfully' });
});

const filterDiscount = catchAsync(async (req, res) => {
  const queryParams = pick(req.query, ['to', 'from', 'search', 'page']);
  let filterParams = {};
  logger.info(JSON.stringify(queryParams));

  if (queryParams.to && queryParams.from) {
    filterParams = {
      // eslint-disable-next-line no-unused-vars
      createdAt: {
        $lte: new Date(queryParams.to),
        $gte: new Date(queryParams.from),
      },
    };
  }

  const discounts = await discountService.filterDiscount(queryParams.search, filterParams, queryParams.page);
  res.send(discounts);
});

const fetchAllDiscounts = catchAsync(async (req, res) => {
  const { page } = req.query;
  const discounts = await discountService.fetchDiscountCodes(page, req.user.id);

  res.send(discounts);
});

module.exports = {
  create,
  edit,
  filterDiscount,
  fetchOne,
  deleteDiscountCode,
  fetchAllDiscounts,
};
