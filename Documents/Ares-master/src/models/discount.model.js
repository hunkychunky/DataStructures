const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const discountSchema = new mongoose.Schema({
  discountCode: {
    type: String,
    max: 15,
    min: 5,
    trim: true,
  },
  percentOff: {
    type: Boolean,
    required: true,
    default: true,
  },
  discountAmount: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
  },
  useLimit: {
    type: Number,
    min: 1,
    required: true,
  },
  useCount: {
    type: Number,
    required: true,
  },
  discountStatus: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    require: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  expiryTime: {
    type: Date,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});

discountSchema.plugin(toJSON);
discountSchema.plugin(paginate);

const DiscountCode = mongoose.model('discountcodes', discountSchema);
module.exports = { DiscountCode };
