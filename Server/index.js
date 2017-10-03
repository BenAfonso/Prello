const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const swaggerJSDoc = require('swagger-jsdoc')
const logger = require('morgan')

if (process.env.NODE_ENV !== 'test') { // Not logging while testing
  app.use(logger('dev'))
}

let swaggerDefinition = {
  info: {
    title: 'Prello Swagger API',
    version: '1.0.0'
  },
  host: `localhost:3333`,
  basePath: '/'
}

let options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/**/*.js']
}

const swaggerSpec = swaggerJSDoc(options)
app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

require('./models/index')
require('./controllers/index')
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
// Serving doc files
app.use('/api-docs', express.static('./api-doc'))

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
  let MONGO_DB_URL
  if (process.env.NODE_ENV === 'test') {
    MONGO_DB_URL = process.env.MONGODB_URL_TEST
  } else {
    MONGO_DB_URL = process.env.MONGODB_URL_DEV
  }
  console.log(MONGO_DB_URL)
  return mongoose.connect(MONGO_DB_URL, options).connection
}

module.exports = app
