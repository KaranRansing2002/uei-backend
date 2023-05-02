const express = require('express');
const { getInstituteDetails, addInstituteDetails } = require('../controller/instituteController');
const instituteRouter = express.Router();

instituteRouter.route('/:id')
    .get(getInstituteDetails)

instituteRouter.route('/')
    .post(addInstituteDetails)

module.exports = instituteRouter;