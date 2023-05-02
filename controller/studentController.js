const studentModel = require('../models/studentModel')

const getStudentDetails = async (req,res) => {
    try {
        const id = req.params.id;
        const resp = await studentModel.findOne({ uid: id });
        console.log(id,resp);
        if (resp) {
            res.json({
                message: 'student data',
                data: resp
            })
        }
        else {
            res.status(404).json({
                message: 'No student found',
                data : []
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error
        })
    }
}

const updateStudentDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const details = req.body;
        console.log(details);
        let student = await studentModel.findOne({ uid: id });
        if (!student) {
            res.json({
                message : "this student doesn't exists in our db"
            })
        }
        
        for (let x in details) {
            console.log(x, details[x]);
            student[x] = details[x];
        }
        await student.save();
        res.json({
            message: 'data updated successfully!',
            data : student
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error
        })
    }
}

module.exports = { 
    getStudentDetails,
    updateStudentDetails
}