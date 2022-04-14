const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { publicValidation } = require('../../validations');
const { publicController } = require('../../controllers');

const router = express.Router();

router
   .route('/quarth')
   .get(auth(), validate(publicValidation.filterProduct), publicController.fetchProductsFromShopForStore);



module.exports = router;