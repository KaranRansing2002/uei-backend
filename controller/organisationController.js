const organisationModel = require('../models/organisationModel');

const getOrganisationDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const org = await organisationModel.findOne({ uid: id });
        if (!org) {
            return res.status(204).json({
                message : 'No record found!'
            })
        }
        else {
            return res.json({
                resp: org
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        })
    }
} 

const addOrganisationDetails = async(req, res) => {
    try {
        const id = req.params.id;
        const details = req.body
        let org = await organisationModel.findOne({ uid: id });
        if (!org) {
            org = await organisationModel.create({...details})
        }
        else {
            org = await organisationModel.findOneAndUpdate({uid:id},{...details})
        }
        return res.json({
            resp: org
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        })
    }
} 

const getAllOrganisations = async (req, res) => {
    try {
        const orgs = await organisationModel.find();
        return res.json({
            resp: orgs
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        })
    }
}

const createOrganisation = async (req, res) => {
    try {
        const email = req.params.email;
        console.log(email,req.params)
        let org = await organisationModel.findOne({ adminUser: email })
        if (!org) {
            org = await organisationModel.create({ adminUser: email })
        }
        return res.json({
            resp: org
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        })
    }
}

module.exports = {
    getAllOrganisations,
    getOrganisationDetails,
    addOrganisationDetails,
    createOrganisation
}