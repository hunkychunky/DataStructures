const mongoose = require('mongoose');
const validator = require('validator');
const generateSlug = require('../services/slug.service');
const { toJSON, paginate } = require('./plugins');

const customerSchema = new mongoose.Schema(
  {
    slugRef: {
      type: String,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      index: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    phone: {
      type: String,
      required: false,
      default: null,
      index: true,
      trim: true,
    },
    address: {
      type: String,
      required: false,
      default: null,
    },
    customerNote: {
      type: String,
      required: false,
      default: null,
    },
    shop: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'shops',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    totalSpent: {
      type: Number,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

customerSchema.pre('save', async function (next) {
  const customer = this;
  customer.slugRef = generateSlug();
  next();
});

// add plugin that converts mongoose to json
customerSchema.plugin(toJSON);
customerSchema.plugin(paginate);

/**
 * @typedef Customer
 */
const Customer = mongoose.model('customers', customerSchema);

module.exports = Customer;
