const express = require('express');
const studentRouter = express.Router();
const {getStudentDetails, updateStudentDetails} = require('../controller/studentController')

studentRouter.route('/:id')
    .get(getStudentDetails)
    .patch(updateStudentDetails)

module.exports = {
    studentRouter
}