const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const swaggerJSDoc = require('swagger-jsdoc')

// swagger definition
let swaggerDefinition = {
  info: {
    title: 'Prello Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger'
  },
  host: 'localhost:3000',
  basePath: '/'
}

// options for the swagger docs
let options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/**/*.js']
}

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options)
// serve swagger
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
  return mongoose.connect(process.env.MONGODB_URL_DEV, options).connection
}
