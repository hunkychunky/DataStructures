const logger = require('../config/logger');
const { Products } = require('../models');

/**
 * create a new product
 * @param {Object} body
 */
const createProduct = async (body) => {
  const product = await Products.create(body);
  return product;
};

/**
 * edit product by id
 * @param {*} id
 * @param {*} body
 */
const editProduct = async (id, body) => {
  const product = await Products.findByIdAndUpdate(id, body, { new: true }).exec();
  return product;
};

/**
 * fetch a single product
 * @param {*} id
 */
const fetchOne = async (id) => {
  const product = await Products.findById(id);
  return product;
};

/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const fetchProducts = async (shopId, page, userId) => {
  const products = await Products.paginate(
    {
      shop: shopId,
      owner: userId,
      is_deleted: false,
    },
    {
      limit: 20,
      page,
      sortBy: 'createdAt:desc',
    }
  );
  return products;
};

/**
 * Delete a product
 * @param {*} id
 */
const deleteProduct = async (value) => {
  if (Array.isArray(value)) {
    await Products.updateMany({ _id: { $in: value } }, { is_deleted: true });
  } else {
    await Products.findByIdAndUpdate(value, { is_deleted: true });
  }
};

/**
 * Filter a product based on product name, price, category
 * @param {*} shopId
 * @param {*} searchParam
 * @param {*} filterParams
 * @param {*} page
 * @returns {Promise<Products>}
 */
const filterProduct = async (shopId, searchParam, filterParams, page) => {
  const searchParamToNum = parseInt(searchParam, 10);
  logger.debug(searchParamToNum);

  const products = await Products.paginate(
    {
      shop: shopId,
      $or: [
        {
          product_name: {
            $regex: `${searchParam}`,
            $options: 'i',
          },
        },
        {
          categories: {
            // eslint-disable-next-line security/detect-non-literal-regexp
            $in: [new RegExp(searchParam)],
          },
        },
        {
          ...(!Number.isNaN(searchParamToNum) && { price: searchParamToNum }),
        },
        {
          product_description: {
            $regex: searchParam,
            $options: 'i',
          },
        },
      ],
      ...filterParams,
    },
    {
      page,
      limit: 20,
      sortBy: 'createdAt:desc',
    }
  );

  return products;
};

module.exports = {
  createProduct,
  editProduct,
  fetchProducts,
  deleteProduct,
  fetchOne,
  filterProduct,
};
