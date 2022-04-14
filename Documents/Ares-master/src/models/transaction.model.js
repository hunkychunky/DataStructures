const mongoose = require('mongoose');
const generateSlug = require('../services/slug.service');
const { toJSON, paginate } = require('./plugins');

const transactionSchema = new mongoose.Schema(
  {
    slugRef: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    shop: {
      type: mongoose.Types.ObjectId,
      ref: 'shops',
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: 'customers',
    },
    status: {
      type: String,
      enum: ['success', 'error', 'pending', 'cancelled', 'reversed'],
    },
    description: {
      type: String,
      default: null,
    },
    seller: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
    tx_ref: {
      type: String,
    },
    meta: {
      fees: [
        {
          type: Object,
        },
      ],
      others: {
        type: Object,
      },
    },
  },
  {
    timestamps: true,
  }
);

transactionSchema.pre('save', async function (next) {
  const transaction = this;
  transaction.slugRef = generateSlug();
  next();
});

// plugins
transactionSchema.plugin(toJSON);
transactionSchema.plugin(paginate);

/**
 * @typedef Transaction
 */
const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;
