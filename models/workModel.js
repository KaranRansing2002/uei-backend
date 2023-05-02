const mongoose = require('mongoose');

const db_link = 'mongodb+srv://karan:z3y9jmdZNP1S8f2g@cluster0.1gkntll.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
  .then(function (db) {
    console.log('work db connected');
  }).catch((err) => {
    console.log(err);
  })

const workSchema = new mongoose.Schema({
  field: String,
  uid: String,
  exps: [
    {
      company: String,
      desc: Array,
      position: String,
      yoe : String
    }
  ]
})

const workModel = mongoose.model('workModel', workSchema);

module.exports = workModel;