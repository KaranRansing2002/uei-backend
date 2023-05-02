const mongoose = require('mongoose')

const db_link = 'mongodb+srv://karan:z3y9jmdZNP1S8f2g@cluster0.1gkntll.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
  .then(function (db) {
    console.log('institute db connected');
  }).catch((err) => {
    console.log(err);
  })

const instituteSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique : true
    },
    course: String,
    degree: String,
    institute: String,
    university: String,
    instituteinfos: [{
        Class: String,
        Date: Date,
        aggregate: String,
        image: String,
        semesters: [
            {
                Aggregate: String,
                subjects: [
                    {
                        subject: String,
                        marks: String
                    }
                ]
            }
        ]
    }]

})

const instituteModel = mongoose.model('instituteModel', instituteSchema);

module.exports = instituteModel