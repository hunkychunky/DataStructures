// const httpStatus = require('http-status');
const { User, Transactions, Shops, Orders } = require('../models');

const dashboard = async () => {
  /**
   * Amount of sellers in the system
   */
  const sellersCount = await User.countDocuments({ roles: 'user' });

  /**
   * Shop Metrics
   */
  const shopsCountTotal = await Shops.estimatedDocumentCount();
  const deactivatedShopsCount = await Shops.countDocuments({ deactivated: true });
  const currentlyActivatedShopCount = await Shops.countDocuments({ deactivated: false });

  /**
   * Transaction Metrics
   */
  const totalTransactions = await Transactions.estimatedDocumentCount();
  const successfulPayouts = await Transactions.countDocuments({ status: 'success' });
  const cancelledPayouts = await Transactions.countDocuments({ status: 'cancelled' });
  const errorPayouts = await Transactions.countDocuments({ status: 'error' });
  const pendingPayouts = await Transactions.countDocuments({ status: 'pending' });
  const creditTotalAgg = await Transactions.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: '$amount',
        },
      },
    },
  ]);

  /**
   * Total amount of money in the system
   */
  let creditTotal = 0;
  if (creditTotalAgg.length > 0) creditTotal = creditTotalAgg[0].total;

  /**
   * Order Metrics
   */
  const totalOrders = await Orders.estimatedDocumentCount();
  const acceptedOrders = await Orders.countDocuments({ status: 'accepted' });
  const pendingOrders = await Orders.countDocuments({ status: 'pending' });
  const completedOrders = await Orders.countDocuments({ status: 'completed' });
  const delayedOrders = await Orders.countDocuments({ status: 'delayed' });
  const canceledOrders = await Orders.countDocuments({ status: 'canceled' });

  return {
    sellersCount,
    creditTotal,
    shopsCountTotal,
    deactivatedShopsCount,
    currentlyActivatedShopCount,
    totalTransactions,
    successfulPayouts,
    cancelledPayouts,
    errorPayouts,
    pendingPayouts,
    totalOrders,
    acceptedOrders,
    pendingOrders,
    completedOrders,
    delayedOrders,
    canceledOrders,
  };
};

const fetchAllSellers = async (page) => {
  const sellers = await User.paginate({ role: 'user' }, { page, sortBy: 'createdAt:desc', limit: 20 });
  return sellers;
};

const fetchAllShops = async (page) => {
  const shops = await Shops.paginate({}, { page, sortBy: 'createdAt:desc', limit: 20 });
  return shops;
};

const fetchAllTransactions = async (page) => {
  const transactions = await Transactions.paginate({}, { page, sortBy: 'createdAt:desc', limit: 20 });
  return transactions;
};

module.exports = {
  dashboard,
  fetchAllSellers,
  fetchAllShops,
  fetchAllTransactions,
};
