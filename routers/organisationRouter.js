const express = require('express');
const { getAllOrganisations, getOrganisationDetails, addOrganisationDetails, createOrganisation } = require('../controller/organisationController');
const organisationRouter = express.Router();

organisationRouter.route('/all')
    .get(getAllOrganisations)

organisationRouter.route('/create/:email')
    .get(createOrganisation)

organisationRouter.route('/:id')
    .get(getOrganisationDetails)
    .patch(addOrganisationDetails)

module.exports = organisationRouter;