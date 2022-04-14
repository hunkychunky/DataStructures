/* eslint-disable camelcase */
const httpStatus = require('http-status');
const { Types } = require('mongoose');
const { Shops, Products, Orders, Transactions, Customers } = require('../models');
const { ORDERSTATUS, TRANSACTIONSTATUS } = require('../utils/constants');
const ApiError = require('../utils/ApiError');
const Transaction = require('../models/transaction.model');
const { firstDayOfCurrentMonth, lastDayofCurrentMonth } = require('../utils/dates');
const returnDateClassification = require('../utils/chartDates');

/**
 * create a new shop
 * @param {*} body
 * @returns
 */
const createShop = async (body, userId) => {
  const shop = await Shops.create({ owner: userId, ...body });
  return shop;
};

/**
 * Confirm Slug is unique.
 * @param {*} slug
 * @returns data;
 */
const findUniqueDomainName = async (domain_name) => {
  const data = await Shops.findOne({ store_domain_name: domain_name });
  return data;
};

/**
 * Fetch a single shop
 * @param {*} id
 * @returns
 */
const fetchOne = async (id) => {
  const shop = await Shops.findById(id);

  // if user has deactivated shop earlier.
  if (shop.deactivated === true) throw new ApiError(httpStatus.NOT_FOUND, 'Shop not found');
  return shop;
};

/**
 * Fetch a single shop by domain name
 * @param {*} domain_name
 * @returns
 */
const fetchShopByDomainName = async (domain_name) => {
  const shop = await Shops.findOne({ store_domain_name: domain_name });

  if (shop.deactivated === true) throw new ApiError(httpStatus.NOT_FOUND, 'Shop not found');
  return shop;
};

/**
 * Update a single shop
 * @param {*} id
 * @param {*} body
 * @returns
 */
const updateShop = async (id, body) => {
  const shop = await Shops.findByIdAndUpdate(id, body, { new: true }).exec();
  return shop;
};

/**
 * Delete Shop
 */

const deleteShop = async (id) => {
  const shop = await Shops.findById(id);
  if (!shop) throw new ApiError(httpStatus.NOT_FOUND, 'shop not found');

  await shop.update({ deactivated: true, deactivation_date: new Date() });
  return shop;
};

/**
 * User metrics for Shop
 * @param {*} user_id
 * @param {*} startDate
 * @param {*} endDate
 * @returns
 */
const userMetrics = async (user_id, startDate, endDate) => {
  const product = await Products.find({}, { sort: { salesCount: -1 } }).limit(5);
  const orders = await Orders.find({ status: ORDERSTATUS.PENDING }).limit(5).populate('transaction').exec();
  let totalIncome = await Transactions.aggregate([
    {
      $match: {
        status: TRANSACTIONSTATUS.SUCCESS,
        seller: user_id,
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: '$amount',
        },
      },
    },
  ]);

  if (totalIncome.length === 0) totalIncome = 0;
  else totalIncome = totalIncome[0].total;

  let amountMadeToday = await Transaction.aggregate([
    {
      $match: {
        status: TRANSACTIONSTATUS.SUCCESS,
        seller: user_id,
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      _id: null,
      total: {
        $sum: '$amount',
      },
    },
  ]);

  const visitorsCount = await Shops.findOne({ owner: user_id });

  if (amountMadeToday.length === 0) amountMadeToday = 0;
  else amountMadeToday = amountMadeToday[0].total;

  return { product, orders, totalIncome, amountMadeToday, visitorsCount: visitorsCount.visitors_count };
};

const dashboard = async (shopId, startDate = null, endDate = null) => {
  let sD = startDate;
  let eD = endDate;
  const shop = await Shops.findById(shopId);
  const totalOrders = await Orders.countDocuments({ shop: shopId });
  const pendingOrders = await Orders.countDocuments({ shop: shopId, status: 'pending' });
  const completedOrders = await Orders.countDocuments({ shop: shopId, status: 'completed' });
  const totalCustomers = await Customers.countDocuments({ shop: shopId });

  const topSellingProduct = await Products.find({ shop: shopId }).sort('salesCount').limit(5);
  const mostViewedProduct = await Products.find({ shop: shopId }).sort('viewCount').limit(5);

  const recentOrders = await Orders.find({ shop: shopId }).populate(['customer', 'transaction']).sort('-1').limit(5);

  if (sD === null) {
    sD = firstDayOfCurrentMonth();
  }

  if (eD === null) {
    eD = lastDayofCurrentMonth();
  }

  const transactions = await Transactions.aggregate([
    {
      $match: {
        shop: Types.ObjectId(shopId),
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$amount' },
      },
    },
    {
      $unwind: {
        path: '$total',
      },
    },
    {
      $project: {
        total: '$total',
        _id: 0,
      },
    },
  ]);

  const totalAmountMade = transactions.length > 0 ? transactions[0].total : 0;

  return {
    totalOrders,
    visitorsCount: shop.visitors_count,
    pendingOrders,
    completedOrders,
    totalCustomers,
    topSellingProduct,
    mostViewedProduct,
    recentOrders,
    totalAmountMade,
  };
};

const dashboardCharts = async (shopId, dateType) => {
  const dateData = returnDateClassification(dateType);

  for (let i = 0; i < dateData.length; i += 1) {
    const curr = dateData[i];
    // eslint-disable-next-line no-await-in-loop
    const orders = await Orders.countDocuments({ shop: shopId, createdAt: { $gte: curr.start, $lte: curr.end } });
    // eslint-disable-next-line no-await-in-loop
    const salesAgg = await Transaction.aggregate([
      {
        $match: {
          shop: Types.ObjectId(shopId),
          createdAt: {
            $gte: curr.start,
            $lte: curr.end,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
      {
        $project: {
          total: '$total',
          _id: 0,
        },
      },
    ]);

    const sales = salesAgg.length > 0 ? salesAgg[0].total : 0;

    dateData[i] = {
      ...dateData[i],
      sales,
      orders,
    };
  }

  const startDateForTAgg = dateData[0].start;
  const endDateforTAgg = dateData[dateData.length - 1].end;

  const totalMadeAgg = await Transactions.aggregate([
    {
      $match: {
        shop: Types.ObjectId(shopId),
        createdAt: {
          $gte: startDateForTAgg,
          $lte: endDateforTAgg,
        },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: '$amount',
        },
      },
    },
    {
      $project: {
        total: '$total',
        _id: 0,
      },
    },
  ]);

  const totalAmountMade = totalMadeAgg.length > 0 ? totalMadeAgg[0].total : 0;

  return { dateData, totalAmountMade };
};

const addVisitors = async (id) => {
  return Shops.findByIdAndUpdate(id, { $inc: { visitors_count: 1 } });
};

const fetchUserShops = async (userId) => {
  const shops = await Shops.find({ owner: userId, deactivated: false }).select(
    '_id store_name store_slug store_domain_name logo'
  );
  return shops;
};

module.exports = {
  createShop,
  findUniqueDomainName,
  fetchOne,
  updateShop,
  deleteShop,
  fetchShopByDomainName,
  userMetrics,
  addVisitors,
  fetchUserShops,
  dashboard,
  dashboardCharts,
};
