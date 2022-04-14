const express = require('express');
const { customerController } = require('../../controllers');
const { customerValidation } = require('../../validations');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const router = express.Router();

router.route('/').post(auth(), validate(customerValidation.create), customerController.createCustomer);

router.route('/fetch/:id').get(auth(), validate(customerValidation.fetch), customerController.fetchStoreCustomers);

router
  .route('/:id')
  .get(auth(), validate(customerValidation.one), customerController.getOneCustomer)
  .patch(auth(), validate(customerValidation.update), customerController.updateCustomer)
  .delete(auth(), validate(customerValidation.one), customerController.deleteCustomer);

router.route('/delete/list').post(auth(), validate(customerValidation.deleteList), customerController.deleteCustomerList);

router.route('/filter/:id').get(auth(), validate(customerValidation.filter), customerController.filterCustomers);
router
  .route('/:id/transactions')
  .get(auth(), validate(customerValidation.fetch), customerController.fetchCustomersTransactions);
router.route('/:id/orders').get(auth(), validate(customerValidation.fetch), customerController.fetchCustomersOrders);

module.exports = router;
