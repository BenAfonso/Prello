const development = require('./env/dev')
const test = require('./env/test')

module.exports = {
  development: development,
  test: test
}[process.env.NODE_ENV || 'development']
