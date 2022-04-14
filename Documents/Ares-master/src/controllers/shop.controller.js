/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const httpStatus = require('http-status');
const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { shopService } = require('../services');
const { DATETYPE } = require('../utils/constants');
// const visitorCountQueue = require('../workers/queues');

const createShop = catchAsync(async (req, res) => {
  const shop = await shopService.createShop(req.body, req.user.id);
  res.send(shop);
});

const editShop = catchAsync(async (req, res) => {
  const shop = await shopService.updateShop(req.params.id, req.body);
  res.send(shop);
});

const getShop = catchAsync(async (req, res) => {
  const shop = await shopService.fetchOne(req.params.id);
  res.send(shop);
});

const fetchUserShops = catchAsync(async (req, res) => {
  const shops = await shopService.fetchUserShops(req.user.id);
  res.send(shops);
});

const checkIfDomainNameExists = catchAsync(async (req, res) => {
  const shop = await shopService.findUniqueDomainName(req.body.domain_name);

  if (shop) {
    res.send({ valid: false });
  } else {
    res.send({ valid: true });
  }
});

const fetchShopByDomainName = catchAsync(async (req, res) => {
  const shop = await shopService.fetchShopByDomainName(req.params.domain_name);
  res.send(shop);
});

const deleteShop = catchAsync(async (req, res) => {
  await shopService.deleteShop(req.params.id);
  res.send({ message: 'Deleted Successfully' });
});

const userMetrics = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['datetype']);

  let startDate = null;
  let endDate = null;
  let alltime = false;

  if (filter.datetype === DATETYPE.THISWEEK) {
    startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    startDate.setHours(0, 0, 0, 0);

    endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
  }

  if (filter.datetype === DATETYPE.THISMONTH) {
    const current_date = new Date();
    startDate = new Date(new Date().getFullYear(), current_date.getMonth(), 1);
    endDate = new Date(new Date().getFullYear(), current_date.getMonth() + 1, 0);
    endDate.setHours(23, 59, 59, 999);
  }

  if (filter.datetype === DATETYPE.TODAY) {
    startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    endDate = new Date();
    endDate.setHours(24, 0, 0, -1);
  }

  if (filter.datetype === DATETYPE.ALLTIME) {
    alltime = true;
  }

  const data = await shopService.dashboard(req.params.shopId, startDate, endDate);
  res.send(data);
});

const fetchDashboardCharts = catchAsync(async (req, res) => {
  const dateType = req.query.datetype ? req.query.datetype : DATETYPE.THISMONTH;
  const results = await shopService.dashboardCharts(req.params.shopId, dateType);
  res.send(results);
});

const addVisitorCount = catchAsync(async (req, res) => {
  // visitorCountQueue.add({ id: req.params.id });
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createShop,
  editShop,
  getShop,
  checkIfDomainNameExists,
  fetchShopByDomainName,
  deleteShop,
  userMetrics,
  addVisitorCount,
  fetchUserShops,
  fetchDashboardCharts,
};
