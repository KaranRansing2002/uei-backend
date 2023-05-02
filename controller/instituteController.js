const instituteModel = require('../models/instituteModel');

const addInstituteDetails = async (req, res) => {
    try {
        const details = req.body;
        console.log(details);
        const ins = await instituteModel.findOne({ uid: details.uid });
        if (ins) {
            await instituteModel.updateOne({ uid: details.uid }, details);
            res.json({
                message : "data updated successfully"
            })
        }
        else {
            await instituteModel.create(details);
            res.json({
                message : 'data created successfully'
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error : error
        })
    }
}
const getInstituteDetails = async (req, res) => {
    try {
        const id = req.params.id
        const ins = await instituteModel.findOne({ uid: id});
        if (ins) {
            res.json({
                message: 'institute data',
                resp : ins
            })
        }
        else {
            res.status(404).json({
                message : 'No record found'
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error : error
        })
    }
}

module.exports = {
    addInstituteDetails,
    getInstituteDetails
}