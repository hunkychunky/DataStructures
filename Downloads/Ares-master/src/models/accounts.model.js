const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
  },
  shop: {
    type: mongoose.Types.ObjectId,
    ref: 'shops',
  },
  bankCode: {
    type: String,
    required: true,
  },
  bankAccount: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
});

accountSchema.plugin(toJSON);
accountSchema.plugin(paginate);

const Accounts = mongoose.model('accounts', accountSchema);

module.exports = Accounts;
