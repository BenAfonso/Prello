const development = require('./env/dev')
const test = require('./env/test')

module.exports = {
  development: development,
  test: test,
  google: {
    clientID: '970457604836-o50jesfa5lblnger6egce7v32p8pukjq.apps.googleusercontent.com',
    clientSecret: '7Uk8k3OQ2GKTpQYUo09Jyxif',
    callbackURL: 'http://localhost:3333/auth/google/callback'
  }
}[process.env.NODE_ENV || 'development']
