const express = require('express');
const studentRouter = express.Router();
const {getStudentDetails, updateStudentDetails, getAllStudents, updateAdditionalInfo, getCertificates, addCerticates} = require('../controller/studentController')

studentRouter.route('/all')
    .get(getAllStudents)

studentRouter.route('/additionalInfo/:id')
    .patch(updateAdditionalInfo)

studentRouter.route('/certificate/:id')
    .get(getCertificates)
    .patch(addCerticates)

studentRouter.route('/:id')
    .get(getStudentDetails)
    .patch(updateStudentDetails)


module.exports = {
    studentRouter
}