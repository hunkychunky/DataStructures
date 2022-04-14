const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const LineItemSchema = new mongoose.Schema(
  {
    cart: {
      type: mongoose.Types.ObjectId,
      ref: 'Cart',
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
    },
    meta: {
      price: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

// plugins
LineItemSchema.plugin(toJSON);
LineItemSchema.plugin(paginate);

const LineItemModel = mongoose.model('line-items', LineItemSchema);
module.exports = LineItemModel;
