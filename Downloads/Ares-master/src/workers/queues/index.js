const createRecipeintCodeQueue = require('./createrecipientcode.queue');
const createSubAccountQueue = require('./createsubaccount.queue');
const vistorCountQueue = require('./visitorcount.queue');
const sendEmailQueue = require('./sendEmail.queue');

const createRecipientCodeQueueService = (id, accountNumber, accountName, bankCode) => {
  createRecipeintCodeQueue.add({ id, accountName, accountNumber, bankCode });
};

const createSubAccountQueueService = (id, businessName, bankCode, accountNumber) => {
  createSubAccountQueue.add({ id, businessName, bankCode, accountNumber });
};

const addVisitorCountToShopQueueService = (id) => {
  vistorCountQueue.add({ id });
};

const sendEmailQueueService = (content) => {
  sendEmailQueue.add({ content });
};

module.exports = {
  createRecipientCodeQueueService,
  addVisitorCountToShopQueueService,
  createSubAccountQueueService,
  sendEmailQueueService,
};
