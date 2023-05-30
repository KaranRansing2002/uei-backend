const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');
const cors = require('cors');
const axios = require('axios');
const studentModel = require('./models/studentModel')
const crypto = require('crypto')
const schoolRouter = require('./routers/schoolRouter');
const { studentRouter } = require('./routers/studentRouter');
const instituteRouter = require('./routers/instituteRouter');
const projectRouter = require('./routers/projectRouter');
const workRouter = require('./routers/workRouter');
const dashRouter = require('./routers/dashRouter');

app.use(cors())
app.use(express.json({ limit: '400kb' }));

const port = 8000;

const jwtCheck = auth({
  audience: 'https://uei-api.com',
  issuerBaseURL: 'https://uei.jp.auth0.com/',
  tokenSigningAlg: 'RS256'
});

app.listen(port, () => console.log(`running on port ${port}`));

app.get('/',(req,res)=>res.send('yo uei here !'))

// app.use(jwtCheck);

app.get('/signin', async(req, res) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const response = await axios.get('https://uei.jp.auth0.com/userinfo', {
      headers:{
        authorization : `Bearer ${accessToken}`
      }
    })
    const user = response.data;
    // console.log(user);
    const student = await handleSave(user);
    // console.log(student);
    res.json(student);
  } catch (error) {
    console.error(error);
  }
})

function generateUID() {
  const bytes = crypto.randomBytes(3); // generate 3 bytes (24 bits) of random data
  const num = parseInt(bytes.toString('hex'), 16); // convert the bytes to an integer
  return num.toString(10).padStart(6, '0'); // convert the integer to a string of 6 digits
}

const handleSave = async(user) => {
  const { email, name ,picture,nickname} = user;
  const student = await studentModel.findOne({ email });
  const uid = generateUID();
  let stud = {};
  if (!student) {
    stud = await studentModel.create({ email, name, uid, image:picture,username : nickname })
  }
  else
    stud = student
  return stud;
}

app.use('/school', schoolRouter)
app.use('/student', studentRouter)
app.use('/institute', instituteRouter)
app.use('/project', projectRouter)
app.use('/work', workRouter)
app.use('/dashboard',dashRouter)

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Internal server error';
  res.status(status).send(message);
})