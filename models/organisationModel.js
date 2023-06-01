const mongoose = require('mongoose')
const crypto = require('crypto')

const db_link = 'mongodb+srv://karan:z3y9jmdZNP1S8f2g@cluster0.1gkntll.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
    .then(function (db) {
        console.log('organisation db connected');
    }).catch((err) => {
        console.log(err);
    })

function generateUID() {
    const bytes = crypto.randomBytes(3); // generate 3 bytes (24 bits) of random data
    const num = parseInt(bytes.toString('hex'), 16); // convert the bytes to an integer
    return num.toString(10).padStart(6, '0'); // convert the integer to a string of 6 digits
}

const organisationSchema = new mongoose.Schema({
    uid: {
        type: String,
        default: generateUID()
    },
    name: String,
    address: String,
    date: String,
    email: {
        type: String,
    },
    grade: String,
    isGovernmentAffiliated: String,
    state: String,
    about: String,
    students: [{
        uid: String
    }],
    totalMembers: Number,
    Access: [{
        email: String
    }],
    isApproved: {
        type: Boolean,
        default : false
    },
    adminUser: String,
    link : String,
})

const organisationModel = mongoose.model('organisationModel', organisationSchema);

module.exports = organisationModel