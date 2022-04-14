const httpStatus = require('http-status');
const { Types } = require('mongoose');
const { Orders, Transactions, Shops, Customers } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new order
 * @param {*} body
 * @param {*} shopId
 * @returns {Promise<Orders>}
 */
const create = async (body, shopId) => {
  const shop = await Shops.findById(shopId);
  if (!shop) throw new ApiError(httpStatus.NOT_FOUND, 'Shop not found');

  let customer = await Customers.findOne({
    name: body.customer.name,
    email: body.customer.email,
    phone: body.customer.phone,
    shop: shop._id,
  });

  if (!customer) {
    customer = await Customers.create({
      name: body.customer.name,
      email: body.customer.email,
      phone: body.customer.phone,
      shop: shop._id,
    });
  }

  const transaction = await Transactions.create({
    ...body.transaction,
    description: `customer purchased goods from ${shop.store_name} worth of ${body.transaction.amount}`,
    status: 'pending',
    customer: customer._id,
    seller: shop.owner,
    tx_ref: `${shopId}-${shop.owner}-${Date.now()}`,
    shop: shop._id,
  });

  const order = await Orders.create({
    ...body.order,
    shop: shop._id,
    customer: customer._id,
    transaction: transaction._id,
  });

  // Validate Transaction in Queue

  return order;
};

/**
 * Fetch shop orders
 * @param {*} shopId
 * @param {*} page
 * @returns {Promise<{results: Orders[], page: number, limit: number, totalResults: number, totalPages: number }>}
 */
const fetchOrders = async (shopId, page) => {
  const orders = await Orders.paginate(
    {
      shop: shopId,
      is_deleted: false,
    },
    {
      limit: 10,
      page,
      populate: 'customer,transaction',
      sortBy: 'createdAt:desc',
    }
  );

  return orders;
};

/**
 * Fetch Order By Id
 * @param {*} orderId
 * @returns {Promise<Orders>}
 */
const fetchOne = async (orderId) => {
  const order = await Orders.findById(orderId).populate(['customer', 'transaction', 'cart.product']);
  return order;
};

/**
 * Update an order by id.
 * @param {*} orderId
 * @param {*} body
 * @returns {Promise<Orders>}
 */
const updateOne = async (orderId, body) => {
  const order = await Orders.findByIdAndUpdate(orderId, body, { new: true });
  return order;
};

/**
 * Delete an order - Soft delete
 * @param {*} orderId
 * @returns { Promise<Orders>}
 */
const deleteOrder = async (orderId) => {
  const order = await Orders.findByIdAndUpdate(orderId, { is_deleted: true });
  return order;
};

/**
 * Delete multiple Orders
 * @param {Array.ObjectId} orderIds
 */
const deleteMultipleOrder = async (orderIds) => {
  await Orders.updateMany({ _id: { $in: orderIds } }, { is_deleted: true });
};

/**
 * Filter and Search an order.
 * @param {*} shopId
 * @param {*} searchParam
 * @param {*} filterParam
 * @param {*} page
 * @returns {Promise<{results: Orders[], page: number, limit: number, totalResults: number, totalPages: number }>}
 */
const filterOrder = async (shopId, searchParam, filterParam, page) => {
  const limit = 10;
  // eslint-disable-next-line prettier/prettier
  const skip = page * limit - limit;
  const orders = await Orders.aggregate([
    {
      $lookup: {
        from: 'customers',
        localField: 'customer',
        foreignField: '_id',
        as: 'referencedCustomer',
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'cart.product',
        foreignField: '_id',
        as: 'referencedProduct',
      },
    },
    {
      $match: {
        shop: Types.ObjectId(shopId),
        $or: [
          {
            'referencedCustomer.name': 'Agba',
          },
          {
            'referencedCustomer.email': RegExp(searchParam, 'i'),
          },
          {
            'referencedCustomer.phone': RegExp(searchParam, 'i'),
          },
          {
            'referencedProduct.product_name': RegExp(searchParam, 'i'),
          },
          {
            slugRef: RegExp(searchParam, 'i'),
          },
        ],
        ...filterParam,
      },
    },
    {
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [{ $skip: skip }, { $limit: limit }],
      },
    },
    {
      $unwind: {
        path: '$metadata',
      },
    },
    {
      $project: {
        results: '$data',
        totalResults: '$metadata.total',
        page,
        limit,
        totalPages: Math.ceil('$metadata.total' / page),
      },
    },
    {
      $addFields: {
        page,
        limit,
        totalPages: { $ceil: { $divide: ['$totalResults', limit] } },
      },
    },
  ]);

  return orders;
};

module.exports = {
  fetchOrders,
  fetchOne,
  updateOne,
  deleteOrder,
  create,
  filterOrder,
  deleteMultipleOrder,
};
