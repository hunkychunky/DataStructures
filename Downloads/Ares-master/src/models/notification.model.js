const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  content: {
    type: String,
    default: null,
  },
  shop: {
    type: mongoose.Types.ObjectId,
    ref: 'shops',
  },
});

const notificationModel = mongoose.model('notifications', notificationSchema);

module.exports = notificationModel;
