const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { bankAccountValidation } = require('../../validations');
const { bankAccountController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(bankAccountValidation.create), bankAccountController.create)
  .get(auth(), bankAccountController.fetch);

router
  .route('/:id')
  .delete(auth(), validate(bankAccountValidation.deleteBankAccount), bankAccountController.deleteBankAccount);
module.exports = router;
