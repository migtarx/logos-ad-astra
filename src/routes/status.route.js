const express = require('express');
const statusRouter = express.Router();
const statusController = require('../controllers/status.controller');
const logger = require('../middlewares/logger');

statusRouter.use(logger)

statusRouter.get('/', statusController.getStatus);

statusRouter.get('/heartbeat', statusController.getStatusHeartBeat);

module.exports = statusRouter;