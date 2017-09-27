const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const models = require('./models/index')


require('dotenv').config()

app.use(bodyParser.json())

app.all('/*', (req, res, next) => {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  // Custom headers
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token')
  if (req.method === 'OPTIONS') {
    res.status(200).end()
  } else {
    next()
  }
})

app.use('/', require('./routes'))

app.use(function (req, res, next) {
  res.status(404).send({
    'status': 404,
    'message': 'Not found !'
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening at port ' + (process.env.PORT || 3000))
})

connect()

function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } }
  return mongoose.connect(process.env.MONGODB_URL_DEV, options).connection
}
require('./controllers/index');