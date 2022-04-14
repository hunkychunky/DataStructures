const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const CategorieSchema = mongoose.Schema({
  category: {
    type: String,
    default: null,
    required: true,
  },
  belongsTo: {
    type: mongoose.Types.ObjectId,
    ref: 'categories',
    default: null,
  },
  productCount: {
    type: Number,
    default: 0,
  },
  storeId: {
    type: mongoose.Types.ObjectId,
    ref: 'shops',
    default: null,
  },
});

CategorieSchema.plugin(toJSON);
CategorieSchema.plugin(paginate);

const Categories = mongoose.model('categories', CategorieSchema);
module.exports = Categories;
