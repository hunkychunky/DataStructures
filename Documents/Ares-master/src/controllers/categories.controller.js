const httpStatus = require('http-status');
const { categoryService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

const fetchMainCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.fetchMainCategory(req.params.id, req.query.page);
  res.send(categories);
});

const fetchSecondaryCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.fetchSubCategory(req.params.id, req.query.primaryId, req.query.page);
  res.send(categories);
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategory(req.params.id, req.body);
  res.send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteListCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.body.categories);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCategory,
  fetchMainCategories,
  fetchSecondaryCategories,
  updateCategory,
  deleteCategory,
  deleteListCategory,
};
