const mongoose = require('mongoose');
const generateSlug = require('../services/slug.service');
const { toJSON, paginate } = require('./plugins');

const statuses = ['accepted', 'pending', 'completed', 'delayed', 'canceled'];

const orderSchema = new mongoose.Schema(
  {
    slugRef: {
      type: String,
    },
    cart: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: 'products',
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        variant: {
          type: String,
          default: null,
        },
      },
    ],
    customer: {
      type: mongoose.Types.ObjectId,
      ref: 'customers',
      index: true,
    },
    // Add discount Object
    shipping_address: {
      type: String,
      default: null,
    },
    delivery_address: {
      type: String,
      default: null,
    },
    billing_address: {
      type: String,
      default: null,
    },
    transaction: {
      type: mongoose.Types.ObjectId,
      ref: 'transactions',
    },
    orderId: {
      type: String,
      default: `${Date.now()}`,
    },
    shop: {
      type: mongoose.Types.ObjectId,
      ref: 'shops',
    },
    seller: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
    status: {
      type: String,
      enum: statuses,
      default: statuses[0],
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    meta: {
      location: {
        type: Object,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre('save', async function (next) {
  const order = this;
  order.slugRef = generateSlug();
  next();
});

// plugins
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
