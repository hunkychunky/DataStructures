const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const CartsSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  state: {
    type: String,
    enum: ['cart', 'payment', 'complete'],
    default: 'cart',
  },
  total: {
    type: Number,
    default: 0,
  },
});

// plugins
CartsSchema.plugin(toJSON);
CartsSchema.plugin(paginate);

const Carts = mongoose.model('carts', CartsSchema);
module.exports = Carts;
