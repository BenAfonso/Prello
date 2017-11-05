require('dotenv').config()
require('./models/index')
require('./controllers/index')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const swaggerSpec = require('./config/swagger')
const config = require('./config')
const logger = require('morgan')
require('./controllers/sockets')

if (process.env.NODE_ENV !== 'test') { // Not logging while testing
  app.use(logger('dev'))
}

app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})
app.use(bodyParser.json({limit: '5mb'}))

app.all('/*', (req, res, next) => {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  // Custom headers
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization')
  if (req.method === 'OPTIONS') {
    res.status(200).end()
  } else {
    next()
  }
})

// Serving doc files
app.use('/api-docs', express.static('./api-doc'))

app.use('/', require('./routes'))

app.use((req, res, next) => {
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
  var options = { useMongoClient: true }
  return mongoose.connect(config.db, options).connection
}

module.exports = app
