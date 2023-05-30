const studentModel = require('../models/studentModel')

const getStudentDetails = async (req,res) => {
    try {
        const id = req.params.id;
        const resp = await studentModel.findOne({ uid: id });
        // console.log(id,resp); 
        if (resp) {
            res.json({
                message: 'student data',
                data: resp
            })
        }
        else {
            res.status(404).json({
                message: 'No student found ',
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

const getAllStudents = async (req, res) => {
    console.log('here')
    try {
        const students = await studentModel.find();
        // console.log('here',students)
        return res.json(students);
    } catch (error) {
        res.status(500).send(error)
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

const updateAdditionalInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const details = req.body;
        console.log(details);
        let student = await studentModel.findOne({ uid: id });
        if (!student) {
            return res.json({
                message: "This student doesn't exist in our database."
            });
        }
        if (!student['additionalInfo'].cpinfo) {
            console.log('there');
            student['additionalInfo'] = {
                ...student['additionalInfo'],
                cpinfo: [{ ...details }]
            }
        }   
        else if (student['additionalInfo'].cpinfo[0].platform === details.platform) {
            let arr = [...student['additionalInfo'].cpinfo]
            arr[0] = { ...details };
            student['additionalInfo'] = {
                ...student['additionalInfo'],
                cpinfo : [...arr]
            }
        }
        else if (student['additionalInfo'].cpinfo.length>1 && student['additionalInfo'].cpinfo[1].platform === details.platform) {
            let arr = [...student['additionalInfo'].cpinfo]
            arr[1] = { ...details };
            student['additionalInfo'] = {
                ...student['additionalInfo'],
                cpinfo : [...arr]
            }
        }
        else {
            let arr = [...student['additionalInfo'].cpinfo]
            arr.push({});
            arr[1] = { ...details };
            student['additionalInfo'] = {
                ...student['additionalInfo'],
                cpinfo : [...arr]
            }
        }
        
        await student.save();
        console.log(student); 
        return res.json({
            message: 'Data updated successfully!',
            data: student.additionalInfo
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
};


module.exports = { 
    getStudentDetails,
    updateStudentDetails,
    getAllStudents,
    updateAdditionalInfo
}