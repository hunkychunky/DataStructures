const { createBullBoard } = require('bull-board');
const { BullAdapter } = require('bull-board/bullAdapter');

const visitorsQueue = require('./queues/visitorcount.queue');
const sendEmailQueue = require('./queues/sendEmail.queue');

const { router } = createBullBoard([new BullAdapter(visitorsQueue), new BullAdapter(sendEmailQueue)]);

module.exports = router;
