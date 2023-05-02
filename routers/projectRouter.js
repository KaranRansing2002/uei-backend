const express = require('express');
const { addProjectDetails, getProjectDetails } = require('../controller/projectController');
const projectRouter = express.Router();

projectRouter.route('/')
    .post(addProjectDetails)

projectRouter.route('/:id')
    .get(getProjectDetails)

module.exports = projectRouter;