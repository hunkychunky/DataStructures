const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const shopRoute = require('./shop.route');
const productRoute = require('./product.route');
const uptimeRoute = require('./uptime.route');
const orderRoute = require('./orders.route');
const customerRoute = require('./customer.route');
const categoriesRoute = require('./categories.route');
const bankAccountRoute = require('./bankAccount.route');
const adminRoute = require('./admin.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/shops',
    route: shopRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/categories',
    route: categoriesRoute,
  },
  {
    path: '/uptime',
    route: uptimeRoute,
  },
  {
    path: '/orders',
    route: orderRoute,
  },
  {
    path: '/customers',
    route: customerRoute,
  },
  {
    path: '/bank-accounts',
    route: bankAccountRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
