const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bankAccountSchema = new mongoose.Schema(
  {
    bankAccountName: {
      type: String,
    },
    bankName: {
      type: String,
    },
    bankAccountNumber: {
      type: String,
    },
    bankCode: {
      type: String,
    },
    receipientCode: {
      type: String,
      default: null,
    },
    subAccountCode: {
      type: String,
      default: null,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

bankAccountSchema.plugin(toJSON);
bankAccountSchema.plugin(paginate);

const BankAccount = mongoose.model('bankAccount', bankAccountSchema);
module.exports = BankAccount;
