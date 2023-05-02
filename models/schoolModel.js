const mongoose = require('mongoose')

const db_link='mongodb+srv://karan:z3y9jmdZNP1S8f2g@cluster0.1gkntll.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log('school db connected');
}).catch((err)=>{
    console.log(err);
})

const subjectSchema = new mongoose.Schema({
    subject: { type: String },
    marks: { type: String }
});
  
const semesterSchema = new mongoose.Schema({
    Aggregate: { type: String },
    subjects: [subjectSchema]
});
  
const classSchema = new mongoose.Schema({
    Class: { type: String },
    aggregate: { type: String },
    semesters: [semesterSchema],
    Date: { type: Date },
    school: { type: String },
    image : String
});
const schoolSchema = new mongoose.Schema({
    uid : String,
    schoolDetails : [classSchema]
})

const schoolModel=mongoose.model('schoolModel',schoolSchema);

module.exports=schoolModel