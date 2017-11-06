const OauthServer = require('oauth2-server')

const oauth = new OauthServer({
  model: require('./model.js'),
  grants: ['authorization_code', 'password', 'refresh_token', 'client_credentials']
})

module.exports = oauth
