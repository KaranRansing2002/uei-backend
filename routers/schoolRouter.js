const express = require('express');
const schoolRouter = express.Router();
const {addSchoolDetails,getSchoolDetails} = require('../controller/schoolController')

schoolRouter.route('/:id')
    .get(getSchoolDetails)

schoolRouter.route('/')
    .post(addSchoolDetails)

module.exports = schoolRouter


