const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { orderValidation } = require('../../validations');
const { orderController } = require('../../controllers');

const router = express.Router();
router.route('/create/:shopId').post(auth(), validate(orderValidation.create), orderController.create);

router.route('/all/:id').get(auth(), validate(orderValidation.fetchAll), orderController.fetchAll);

router.route('/filter/:id').get(auth(), validate(orderValidation.filter), orderController.filterOrders);

router
  .route('/:id')
  .get(auth(), validate(orderValidation.fetchOne), orderController.fetchOne)
  .patch(auth(), validate(orderValidation.updateOne), orderController.updateOne)
  .delete(auth(), validate(orderValidation.deleteOne), orderController.deleteOne);

router.route('/delete/list').post(auth(), validate(orderValidation.deleteMultiple), orderController.deleteMultipleOrders);
module.exports = router;
