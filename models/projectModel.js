const mongoose = require('mongoose');

const db_link = 'mongodb+srv://karan:z3y9jmdZNP1S8f2g@cluster0.1gkntll.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
  .then(function (db) {
    console.log('project db connected');
  }).catch((err) => {
    console.log(err);
  })

const projectSchema = new mongoose.Schema({
    uid: String,
    dsa: [
      {},
    ],
    frameworks: Array,
    languages: Array,
    skills: Array,
    tools: Array,
    projects: [
        {
            desc: Array,
            id : Number
        }
    ],
    githubusername : String
})

const projectModel = mongoose.model('projectModel', projectSchema);
module.exports = projectModel
