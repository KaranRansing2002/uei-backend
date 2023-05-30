const express = require('express');
const { getDashInfo } = require('../controller/dashController');
const dashRouter = express.Router();

dashRouter.route('/:id')
    .get(getDashInfo)

module.exports = dashRouter;