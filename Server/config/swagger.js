const swaggerJSDoc = require('swagger-jsdoc')

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

module.exports = swaggerJSDoc(options)
