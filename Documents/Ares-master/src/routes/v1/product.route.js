const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { productValidation } = require('../../validations');
const { productController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(productValidation.create), productController.create)
  .get(auth(), validate(productValidation.fetchProducts), productController.fetchAllProducts);

router.route('/filter/:id').get(auth(), validate(productValidation.filterProduct), productController.filterAllProducts);

router
  .route('/:id')
  .get(auth(), validate(productValidation.fetchOne), productController.fetchOne)
  .patch(auth(), validate(productValidation.edit), productController.edit)
  .delete(auth(), validate(productValidation.deleteProduct), productController.deleteProduct);

router.route('/delete/list').post(auth(), validate(productValidation.deleteList), productController.deleteManyProduct);

router.route('/delete/images').post(auth(), validate(productValidation.deleteImages), productController.deleteImage);

module.exports = router;

