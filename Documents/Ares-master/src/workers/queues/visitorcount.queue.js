const Queue = require('bull');
const logger = require('../../config/logger');

const { Shops } = require('../../models');

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const visitorCountQueue = new Queue('add visitor count', { redis: REDIS_URL });

visitorCountQueue.process(async (job, done) => {
  try {
    await Shops.findByIdAndUpdate(job.data.id, { $inc: { visitors_count: 1 } });
    done();
  } catch (e) {
    logger.error(e);
  }
});

module.exports = visitorCountQueue;
