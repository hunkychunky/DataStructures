const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { discountValidation } = require('../../validations/discount.validation');
const { discountController } = require('../../controllers/discount.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(discountValidation.create), discountController.create)
  .get(auth(), validate(discountValidation.fetchDiscountCode), discountController.fetchAllDiscounts);

router
  .route('/:id')
  .get(auth(), validate(discountValidation.fetchOne), discountController.fetchOne)
  .patch(auth(), validate(discountValidation.edit), discountController.edit)
  .delete(auth(), validate(discountValidation.deleteDiscount), discountController.deleteDiscountCode);

router.route('/filter/:id').get(auth(), validate(discountValidation.filterDiscount), discountController.filterDiscount);

module.exports = router;
