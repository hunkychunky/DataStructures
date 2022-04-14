const mongoose = require('mongoose');
const generateSlug = require('../services/slug.service');
const { toJSON, paginate } = require('./plugins');

const productSchema = new mongoose.Schema(
  {
    slugRef: {
      type: String,
      index: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
    shop: {
      type: mongoose.Types.ObjectId,
      ref: 'shops',
    },
    product_name: {
      type: String,
      default: null,
      required: true,
    },
    product_description: {
      type: String,
      default: null,
    },
    product_properties: [
      {
        name: {
          type: String,
          default: null,
        },
        description: {
          type: String,
          default: null,
        },
      },
    ],
    product_variants: [
      {
        name: {
          type: String,
        },
        values: [
          {
            type: String,
          },
        ],
      },
    ],
    price: {
      type: Number,
      default: 0,
    },
    discount_price: {
      type: Number,
      default: 0,
    },
    cost_price: {
      type: Number,
      default: 0,
    },
    sku: {
      type: String,
      default: null,
    },
    stock_unit: {
      type: String,
      default: null,
    },
    stock_quantity: {
      type: Number,
      default: 0,
    },
    item_unit: {
      type: String,
      default: null,
    },
    display_price: {
      type: String,
      default: null,
    },
    currency: {
      type: String,
      default: null,
    },
    in_stock: {
      type: Boolean,
      default: true,
    },
    displayInStore: {
      type: Boolean,
      default: false,
    },
    images: [
      {
        type: Object,
      },
    ],
    salesCount: {
      type: Number,
      default: 0,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      require: true,
    },
    categories: [
      {
        type: String,
        default: null,
      },
    ],
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }

);

productSchema.pre('save', async function (next) {
  const product = this;
  product.slugRef = generateSlug();
  next();
});

// plugins
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * @typedef Product
 */
const Product = mongoose.model('products', productSchema);

module.exports = Product;
