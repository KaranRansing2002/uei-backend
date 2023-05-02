const express = require('express');
const { addWorkDetails, getWorkDetails } = require('../controller/workController');
const workRouter = express.Router();

workRouter.route('/')
    .post(addWorkDetails)

workRouter.route('/:id')
    .get(getWorkDetails)

module.exports = workRouter;