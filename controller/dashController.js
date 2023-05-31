const instituteModel = require('../models/instituteModel');
const schoolModel = require('../models/schoolModel');
const workModel = require('../models/workModel');
const studentModel = require('../models/studentModel');
const projectModel = require('../models/projectModel');

const addRecentAchievements = async (req, res) => {
    try {
        const { id } = req.params;
        const details = req.body;
        const stud = await studentModel.findOne({ uid: id }).select('additionalInfo');
        if (!stud.additionalInfo.recentAchievements) {
            stud.additionalInfo = {
                ...stud['additionalInfo'],
                recentAchievements: [{ ...details }]
            }
        }
        else {
            stud.additionalInfo = {
                ...stud['additionalInfo'],
                recentAchievements: [...stud['additionalInfo'].recentAchievements,{ ...details }]
            }
        }
        await stud.save();
        return res.json(stud.additionalInfo.recentAchievements);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const getDashInfo = async (req, res) => {
    try {
        const { id } = req.params;
        
        const stud = await studentModel.findOne({uid : id }).select('additionalInfo');
        const proj = await projectModel.findOne({uid : id }).select('frameworks languages tools skills');
        const collg = await instituteModel.findOne({uid : id}).select('course degree institute university instituteinfos')
        
        const extras = proj;
        const { course, degree, institute, university } = collg;

        if (!stud) {
            return res.status(404).json({
                message : 'No student found'
            })
        }

        let lineDataYear = [];
        let lineDataSem = []
        let currentYear = {};
        let sem = 1,year=1;
        for (let x of collg.instituteinfos) {
            currentYear = {
                Class : x['Class'],
                Date : x['Date'],
                aggregate : x['aggregate']
            }
            lineDataYear.push({ x: `Year ${year++}`, y: parseFloat(x.aggregate.split(" ")[0]) })
            if (x.semesters[0].Aggregate != undefined) {
                lineDataSem.push({ x: `Sem ${sem}`, y: parseFloat(x.semesters[0].Aggregate.split(" ")[0]) })
                lineDataSem.push({ x: `Sem ${sem+1}`, y: parseFloat(x.semesters[1].Aggregate.split(" ")[0]) })
                sem+=2;
            }
        }

        if (!collg || (course.length==0 && degree.length==0 && institute.length==0) || (lineDataYear.length<3 && lineDataSem.length<3) ) {
            console.log('no data');
            return res.status(204).json({
                message : 'Not Sufficient Data .'
            })
        }

        const upper = {
            ...stud['additionalInfo'] 
        }
        
        const upper1= {
            course,
            degree,
            institute,
            university,
            currentYear
        }
        console.log(upper1, course, degree)
        
        if (!stud.additionalInfo.recentAchievements) {
            stud.additionalInfo = {
                ...stud['additionalInfo'],
                recentAchievements : []
            }
            await stud.save();
        }

        const middle = {
            lineDataSem,
            lineDataYear,
            recentAchievements: stud.additionalInfo.recentAchievements 
        }
        console.log(middle);

        return res.json({
            upper,
            upper1,
            middle,
            extras,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getDashInfo,
    addRecentAchievements
};
