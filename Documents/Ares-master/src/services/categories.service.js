const httpStatus = require('http-status');
const { Categories } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new category
 * @param {*} body
 * @returns {Promise<Categories>}
 */
const createCategory = async (body) => {
  const category = await Categories.create(body);
  return category;
};

/**
 * Fetch all main shop category
 * @param {*} storeId
 * @param {*} page
 * @returns {Promise<Categories[]>}
 */
const fetchMainCategory = async (storeId, page) => {
  const main = await Categories.paginate(
    { storeId, belongsTo: { $type: 10 } },
    { page, limit: 10, sortBy: 'createdAt:desc' }
  );
  return main;
};

/**
 * Fetch all category under a category
 * @param {*} storeId
 * @param {*} primaryCategory
 * @param {*} page
 * @returns {Promise<Categories[]>}
 */
const fetchSubCategory = async (storeId, primaryCategory, page) => {
  const secondary = await Categories.paginate(
    { storeId, belongsTo: primaryCategory },
    { page, limit: 10, sortBy: 'createdAt:desc', populate: 'belongsTo' }
  );
  return secondary;
};

const updateCategory = async (id, update) => {
  const category = await Categories.findById(id);
  if (!category) throw new ApiError(httpStatus.NOT_FOUND, 'Invalid category id');

  Object.assign(category, update);
  await category.save();

  return category;
};

const deleteCategory = async (id) => {
  if (Array.isArray(id)) {
    await Categories.deleteMany({ _id: { $in: id } });
  } else {
    await Categories.findByIdAndDelete(id);
  }
};

module.exports = {
  createCategory,
  fetchMainCategory,
  fetchSubCategory,
  updateCategory,
  deleteCategory,
};
