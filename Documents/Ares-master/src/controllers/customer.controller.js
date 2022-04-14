const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { customerService } = require('../services');
const pick = require('../utils/pick');

const createCustomer = catchAsync(async (req, res) => {
  const newCustomer = await customerService.createCustomer(req.body);
  res.status(httpStatus.CREATED).send(newCustomer);
});

const fetchStoreCustomers = catchAsync(async (req, res) => {
  const customers = await customerService.fetchStoreCustomers(req.params.id, req.query.page);
  res.status(httpStatus.OK).send(customers);
});

const getOneCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.getOneCustomer(req.params.id);
  res.send(customer);
});

const updateCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.updateCustomer(req.params.id, req.body);
  res.send(customer);
});

const deleteCustomer = catchAsync(async (req, res) => {
  await customerService.deleteCustomer(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteCustomerList = catchAsync(async (req, res) => {
  await customerService.deleteCustomer(req.body.customers);
  res.status(httpStatus.NO_CONTENT).send();
});

const filterCustomers = catchAsync(async (req, res) => {
  const queryParams = pick(req.query, ['search', 'to', 'from', 'page']);
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

  const customers = await customerService.filterCustomers(shopId, queryParams.search, filterParams, queryParams.page);
  res.send(customers);
});

const fetchCustomersOrders = catchAsync(async (req, res) => {
  const orders = await customerService.getCustomerOrders(req.params.id, req.query.page);
  res.send(orders);
});

const fetchCustomersTransactions = catchAsync(async (req, res) => {
  const transactions = await customerService.getCustomerTransactions(req.params.id, req.query.page);
  res.send(transactions);
});

module.exports = {
  createCustomer,
  fetchStoreCustomers,
  getOneCustomer,
  updateCustomer,
  deleteCustomer,
  deleteCustomerList,
  filterCustomers,
  fetchCustomersOrders,
  fetchCustomersTransactions,
};
