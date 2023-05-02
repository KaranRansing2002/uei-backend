const schoolModel = require('../models/schoolModel');

const addSchoolDetails = async (req, res) => {
    try {
        const details = req.body;
        console.log(details)
        let school = await schoolModel.findOne({ uid: details.uid })
        if (school) {
            school = await schoolModel.updateOne({ uid: details.uid }, details);
            return res.json({
                message: 'data updated successfully',
                resp : school
            })
        }
        const resp = await schoolModel.create(details);
        res.json({
            message: 'details added successfully',
            resp: resp
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message : error.message
        })
    }
}

const getSchoolDetails = async(req, res) => {
    try {
        const id = req.params.id;
        const resp = await schoolModel.findOne({ uid: id });
        console.log(resp);
        if (resp) {
            res.json({
                message: 'school data',
                resp : resp
            })
        }
        else {
            res.json({
                message: 'No record found',
                data : []
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message : error.message
        })
    }
}

module.exports = {
    addSchoolDetails,
    getSchoolDetails
}