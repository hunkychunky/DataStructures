const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { categoriesController } = require('../../controllers');
const { categoriesValidation } = require('../../validations');

const router = express.Router();

router.route('/').post(auth(), validate(categoriesValidation.create), categoriesController.createCategory);

router.route('/main/:id').get(auth(), validate(categoriesValidation.fetch), categoriesController.fetchMainCategories);
router.route('/sub/:id').get(auth(), validate(categoriesValidation.fetch), categoriesController.fetchSecondaryCategories);

router
  .route('/:id')
  .patch(auth(), validate(categoriesValidation.update), categoriesController.updateCategory)
  .delete(auth(), validate(categoriesValidation.one), categoriesController.deleteCategory);

router.route('/list/delete').post(auth(), validate(categoriesValidation.list), categoriesController.deleteListCategory);

module.exports = router;
