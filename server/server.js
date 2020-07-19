const env = require('dotenv').config({path: './.env'});
let {TWILIO_ACCOUNT_SID,  TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER}= env.parsed;
console.log(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, );

const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors');
const client = require('twilio')(
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN
  );

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.use(cors());

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});
app.post('/api/messages', (req,res)=>{
    res.header('Content-Type', 'application/json');
    client.messages
    .create({
      from: TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err, "ERROR");
      res.send(JSON.stringify({ success: false }));
    });
})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);