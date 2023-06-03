const projectModel = require('../models/projectModel');
const studentModel = require('../models/studentModel');

const addProjectDetails = async (req, res) => {
    try {
        const details = req.body;
        console.log(details);
        const project = await projectModel.findOne({ uid: details.uid });
        // console.log(details)
        if (project) {
            await projectModel.updateOne({ uid: details.uid }, details);
            if (details.githubusername != '') {
                const stud = await studentModel.findOne({ uid: details.uid });
                console.log("github")
                stud['additionalInfo'] = {
                    ...stud['additionalInfo'],
                    github : `https://github.com/${details.githubusername}`
                }
                await stud.save();
            }
            res.json({
                message : "data updated successfully"
            })
        }
        else {
            await projectModel.create(details);
            if (details.githubusername != '') {
                const stud = await studentModel.findOne({ uid: details.uid });
                console.log("github")
                stud['additionalInfo'] = {
                    ...stud['additionalInfo'],
                    github : `https://github.com/${details.githubusername}`
                }
                await stud.save();
            }
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

const getProjectDetails = async (req, res) => {
    try {
        const id = req.params.id
        const prj = await projectModel.findOne({ uid: id});
        if (prj) {
            res.json({
                message: 'project and skills data',
                resp : prj
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
    addProjectDetails,
    getProjectDetails
}