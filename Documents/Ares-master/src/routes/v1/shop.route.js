const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { shopController } = require('../../controllers');
const { shopValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(shopValidation.createShop), shopController.createShop)
  .get(auth(), shopController.fetchUserShops);

router
  .route('/:id')
  .get(auth(), validate(shopValidation.viewShop), shopController.getShop)
  .patch(auth(), validate(shopValidation.editShop), shopController.editShop)
  .delete(auth(), validate(shopValidation.deleteShop), shopController.deleteShop);

router.route('/checkdomain').post(auth(), shopController.checkIfDomainNameExists);

router.route('/visitors-count').patch(auth(), shopController.addVisitorCount);

router
  .route('/domain/:domain_name')
  .get(auth(), validate(shopValidation.fetchByDomainName), shopController.fetchShopByDomainName);

router.route('/dashboard/:shopId').get(auth(), shopController.userMetrics);

router
  .route('/dashboard/charts/:shopId')
  .get(auth(), validate(shopValidation.dashboardCharts), shopController.fetchDashboardCharts);

module.exports = router;
