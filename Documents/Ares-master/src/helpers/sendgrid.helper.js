const sengridClient = require('@sendgrid/mail');
const logger = require('../config/logger');

sengridClient.setApiKey(`${process.env.SENDGRID_API_KEY}`);

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (content) => {
  try {
    const result = await sengridClient.send(content);
    logger.debug(JSON.stringify(result));
  } catch (err) {
    // Catch Email sending error before it craches app
    logger.debug(JSON.stringify(err));
    logger.warn(err.message);
  }
};

module.exports = sendEmail;
