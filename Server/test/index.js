process.env.NODE_ENV = 'test'

// Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')

chai.use(chaiHttp)

// Import global test file
require('../routes/api.spec')(server, chai)
