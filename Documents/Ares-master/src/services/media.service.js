const cloudinary = require('cloudinary').v2;
const logger = require('../config/logger');

/* eslint-disable no-await-in-loop */

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});
/**
 * Delete images from cloudinary through public ids
 * @param {Array} publicIds
 * @returns
 */
const deleteImageFromCloudinary = async (publicIds) => {
  // eslint-disable-next-line no-restricted-syntax
  logger.debug(JSON.stringify(publicIds));
  for (let i = 0; i < publicIds.length; i += 1) {
    const curr = publicIds[i];
    try {
      const result = await cloudinary.uploader.destroy(curr);
      logger.debug(result);
    } catch (error) {
      logger.debug(error);
    }
  }
};

module.exports = {
  deleteImageFromCloudinary,
};
