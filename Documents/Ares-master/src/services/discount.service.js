const { discountGenerator } = require('../helpers/codeGenerator.helper');
const { DiscountCode } = require('../models');
const logger = require('../config/logger');

const fetchDiscountCodes = async (page, userId) => {
  const discounts = await DiscountCode.paginate(
    {
      owner: userId,
      is_deleted: false,
    },
    {
      limit: 20,
      page,
      sortBy: 'createdAt:desc',
    }
  );
  return discounts;
};

const fetchDiscountCode = async (discountCode) => {
  return DiscountCode.findOne({ discountCode });
};
const createDiscountCode = async (body) => {
  const typeTwo = { ...body };

  if (!typeTwo.discountCode || typeTwo.discountCode === null) {
    let invalid = false;
    let generatedCode = null;

    do {
      generatedCode = discountGenerator.discountgenerator();
      invalid = fetchDiscountCode(generatedCode);
    } while (!invalid || invalid === null);

    typeTwo.discountCode = generatedCode;
  }
  const discount = await DiscountCode.create(typeTwo);
  return discount;
};

const editDiscountCode = async (id, body) => {
  const discount = await DiscountCode.findByIdAndUpdate(id, body, { new: true }).exec();
  return discount;
};

const fetchOne = async (id) => {
  const discount = await DiscountCode.findById(id);
  return discount;
};
const deleteDiscountCode = async (value) => {
  if (Array.isArray(value)) {
    await DiscountCode.updateMany({ _id: { $in: value } }, { is_deleted: true });
  } else {
    await DiscountCode.findByIdAndUpdate(value, { is_deleted: true });
  }
};

const filterDiscount = async (searchParam, filterParams, page) => {
  const searchParamToNum = parseInt(searchParam, 10);
  logger.debug(searchParamToNum);

  const discountcode = await DiscountCode.paginate(
    {
      $or: [
        {
          discount_code: {
            $regex: `${searchParam}`,
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

  return discountcode;
};

module.exports = {
  createDiscountCode,
  editDiscountCode,
  fetchDiscountCodes,
  deleteDiscountCode,
  filterDiscount,
  fetchOne,
};
