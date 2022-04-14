const mongoose = require('mongoose');
const slugify = require('slugify');
const { toJSON, paginate } = require('./plugins');

// const templateStyle = ['list', 'grid', 'mansory'];

const shopSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
    },
    store_name: {
      type: String,
      default: null,
    },
    store_address: {
      type: String,
      default: null,
    },
    store_email: {
      type: String,
      default: null,
    },
    store_phone: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    logo: {
      type: String,
      default: null,
    },
    headline: {
      type: String,
      default: null,
    },
    header_images: [
      {
        type: Object,
      },
    ],
    selected_template: {
      type: String,
      default: 'bazaar',
    },
    store_domain_name: {
      type: String,
      default: null,
      unique: true,
      index: true,
    },
    page_layout: {
      type: Number,
      default: 3,
    },
    deactivated: {
      type: Boolean,
      default: false,
    },
    visitors_count: {
      type: Number,
      default: 0,
    },
    twitter_link: {
      type: String,
    },
    instagram_link: {
      type: String,
    },
    facebook_link: {
      type: String,
    },
    deactivation_date: {
      type: Date,
      default: null,
    },
    delivery_settings: {
      setting_type: {
        type: String,
        enum: ['standard', 'by-state'],
      },
      standard_price: {
        type: Number,
        default: 1500,
      },
      prices_by_state: [
        {
          state: {
            type: String,
          },
          price: {
            type: Number,
            default: 1500,
          },
        },
      ],
    },
    bankAccount: {
      type: mongoose.Types.ObjectId,
      ref: 'bankAccount',
    },
  },
  {
    timestamps: true,
  }
);

// plugins
shopSchema.plugin(toJSON);
shopSchema.plugin(paginate);

/**
 * Check is slug has been taken
 * @param {string} slug
 * @returns {Promise<boolean>}
 */
shopSchema.statics.isSlugTaken = async function (slug) {
  const store = await this.findOne({ store_slug: slug });
  return !!store;
};

shopSchema.pre('save', async function (next) {
  const store = this;

  if (store.isModified('store_name')) {
    store.store_slug = slugify(store.store_name);
  }

  next();
});

/**
 * @typedef Shop
 */
const Shop = mongoose.model('shops', shopSchema);

module.exports = Shop;
