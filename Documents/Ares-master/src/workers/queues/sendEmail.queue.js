const Queue = require('bull');
const logger = require('../../config/logger');

const emailHelper = require('../../helpers/sendgrid.helper');

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const sendEmailQueue = new Queue('send Email Address Queue', REDIS_URL);

sendEmailQueue.process(async (job, done) => {
  try {
    logger.debug(JSON.stringify(job.data));
    await emailHelper(job.data.content);
    done();
  } catch (e) {
    logger.error(e);
  }
});

module.exports = sendEmailQueue;
