const mongoose = require('mongoose')

const db_link = 'mongodb+srv://karan:z3y9jmdZNP1S8f2g@cluster0.1gkntll.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
  .then(function (db) {
    console.log('student db connected');
  }).catch((err) => {
    console.log(err);
  })

const studentSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  image: String,
  username: String,
  dob: Date,
  additionalInfo: {
    type: Object,
    default : {}
  },
  bio : String
});

const studentModel = mongoose.model('studentModel', studentSchema);

module.exports = studentModel
