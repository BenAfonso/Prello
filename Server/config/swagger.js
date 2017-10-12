const swaggerJSDoc = require('swagger-jsdoc')

let swaggerDefinition = {
  info: {
    title: 'Prello Swagger API',
    version: '1.0.0'
  },
  produces: ['application/json'],
  consumes: ['application/json'],
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [
    { JWT: [] }
  ],
  basePath: '/'
}

let options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/**/*.js']
}

module.exports = swaggerJSDoc(options)
