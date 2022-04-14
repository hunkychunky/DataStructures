const httpStatus = require('http-status');
const { orderService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');

const create = catchAsync(async (req, res) => {
  await orderService.create(req.body, req.params.shopId);
  res.status(httpStatus.CREATED).send({ message: 'Order is processing' });
});

const fetchAll = catchAsync(async (req, res) => {
  const orders = await orderService.fetchOrders(req.params.id, req.query.page);
  res.send(orders);
});

const fetchOne = catchAsync(async (req, res) => {
  const order = await orderService.fetchOne(req.params.id);
  res.send(order);
});

const updateOne = catchAsync(async (req, res) => {
  const order = await orderService.updateOne(req.params.id, req.body);
  res.send(order);
});

const deleteOne = catchAsync(async (req, res) => {
  await orderService.deleteOrder(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const filterOrders = catchAsync(async (req, res) => {
  const queryParams = pick(req.query, ['search', 'to', 'from', 'page', 'status']);
  const shopId = req.params.id;

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

  if (queryParams.status) {
    filterParams.status = queryParams.status;
  }

  const orders = await orderService.filterOrder(shopId, queryParams.search, filterParams, queryParams.page);
  res.send(orders);
});

const deleteMultipleOrders = catchAsync(async (req, res) => {
  await orderService.deleteMultipleOrder(req.body.orders);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  create,
  fetchAll,
  fetchOne,
  updateOne,
  deleteOne,
  filterOrders,
  deleteMultipleOrders,
};
