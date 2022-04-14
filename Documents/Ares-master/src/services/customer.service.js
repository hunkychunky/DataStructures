const httpStatus = require('http-status');
const { Customers, Transactions, Orders } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new customer
 * @param {Object} customerData
 * @returns {Promise<Customers>}
 */
const createCustomer = async (customerData) => {
  const newCustomer = await Customers.create(customerData);
  return newCustomer;
};

/**
 * Fetch Store Customers
 * @param {*} storeId
 * @param {*} page
 * @returns {Promise<Customers[]>}
 */
const fetchStoreCustomers = async (shopId, page) => {
  const customers = await Customers.paginate(
    { shop: shopId, isDeleted: false },
    { limit: 10, page, sortBy: 'createdAt:desc' }
  );
  return customers;
};

/**
 * get customer by id
 * @param {*} customerId
 * @returns {Promise<Customers>}
 */
const getOneCustomer = async (customerId) => {
  const customer = await Customers.findById(customerId);
  if (!customer) throw new ApiError(httpStatus.BAD_REQUEST, 'Customer not found');
  if (customer.isDeleted) throw new ApiError(httpStatus.BAD_REQUEST, 'Customer not found');

  const transactionsPromise = await Transactions.paginate(
    { customer: customerId },
    { page: 1, limit: 5, sortBy: 'createdAt:desc' }
  );
  const ordersPromise = await Orders.paginate({ customer: customerId }, { page: 1, limit: 5, sortBy: 'createdAt:desc' });

  const [transactions, orders] = await Promise.allSettled([transactionsPromise, ordersPromise]);

  return { customer, transactions: transactions.value, orders: orders.value };
};

/**
 * Fetch customers transactions.
 * @param {*} customerId
 * @param {*} page
 * @returns {Promise<{results: Transactions[], page: number, limit: number, totalResults: number, totalPages: number }>}
 */
const getCustomerTransactions = async (customerId, page) => {
  const result = await Transactions.paginate({ customer: customerId }, { page, limit: 5, sortBy: 'createdAt:desc' });
  return result;
};

/**
 * Fetch customers orders.
 * @param {*} customerId
 * @param {*} page
 * @returns {Promise<{results: Orders[], page: number, limit: number, totalResults: number, totalPages: number }>}
 */
const getCustomerOrders = async (customerId, page) => {
  const result = await Orders.paginate({ customer: customerId }, { page, limit: 5, sortBy: 'createdAt:desc' });
  return result;
};

/**
 * Update a customer
 * @param {*} customerId
 * @param {*} body
 * @returns {Promise<Customers>}
 */
const updateCustomer = async (customerId, body) => {
  const customer = await Customers.findById(customerId);
  if (!customer) throw new ApiError(httpStatus.BAD_REQUEST, 'Customer not found');

  Object.assign(customer, body);
  await customer.save();
  return customer;
};

/**
 * Soft's deletes a customer
 * @param {*} customerId
 * @returns {null}
 */
const deleteCustomer = async (customerId) => {
  if (Array.isArray(customerId)) {
    await Customers.updateMany({ _id: { $in: customerId } }, { isDeleted: true });
  } else {
    await Customers.findByIdAndUpdate({ _id: customerId }, { isDeleted: true });
  }
};

/**
 * Filter customer according to email, name and phone
 * @param {*} filterParam
 * @param {*} page
 */
const filterCustomers = async (shopId, searchParam, filterParam, page) => {
  const customers = await Customers.paginate(
    {
      shop: shopId,
      $or: [
        {
          email: { $regex: `${searchParam}`, $options: 'i' },
        },
        {
          name: { $regex: `${searchParam}`, $options: 'i' },
        },
        {
          phone: { $regex: `${searchParam}`, $options: 'i' },
        },
      ],
      ...filterParam,
    },
    { page, limit: 10, sortBy: 'createdAt:desc' }
  );
  return customers;
};

module.exports = {
  createCustomer,
  fetchStoreCustomers,
  getOneCustomer,
  updateCustomer,
  deleteCustomer,
  filterCustomers,
  getCustomerTransactions,
  getCustomerOrders,
};
