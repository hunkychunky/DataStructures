const express = require('express');
const { uptimeController } = require('../../controllers');

const router = express.Router();

router.route('/').get(uptimeController.uptime);

module.exports = router;
