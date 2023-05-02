const workModel = require('../models/workModel');

const addWorkDetails = async (req, res) => {
    try {
        const details = req.body;
        console.log(details);
        const work = await workModel.findOne({ uid: details.uid });
        if (work) {
            await workModel.updateOne({ uid: details.uid }, details);
            res.json({
                message : "data updated successfully"
            })
        }
        else {
            await workModel.create(details);
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

const getWorkDetails = async (req, res) => {
    try {
        console.log('here sdan')
        const id = req.params.id
        const work = await workModel.findOne({ uid: id});
        if (work) {
            res.json({
                message: 'work Exp Data',
                resp : work
            })
        }
        else {
            res.json({
                message: 'No record found',
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
    addWorkDetails,
    getWorkDetails
}