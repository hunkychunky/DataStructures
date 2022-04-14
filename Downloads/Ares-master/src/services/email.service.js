const { sendEmailQueueService } = require('../workers/queues');

const sendWelcomeEmail = async (to, userName) => {
  const content = {
    to,
    from: {
      email: `${process.env.WELCOME_EMAIL_FROM}`,
      name: `${process.env.WELCOME_EMAIL_NAME}`,
    },
    templateId: `${process.env.WELCOME_TEMPLATE_ID}`,
    dynamic_template_data: {
      name: userName,
    },
  };

  /**
   * Add welcome email to email queue service
   */
  sendEmailQueueService(content);
};

module.exports = {
  sendWelcomeEmail,
};
