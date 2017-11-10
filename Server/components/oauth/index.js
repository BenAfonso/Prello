const OauthServer = require('oauth2-server')
const mongoose = require('mongoose')
const OAuthClient = mongoose.model('OAuthClient')

OAuthClient.count({}).then(c => {
  if (c === 0) {
    let defaultClient = new OAuthClient({
      name: 'PrelloAPI',
      client_id: process.env.PRELLO_CLIENTID,
      client_secret: process.env.PRELLO_SECRET,
      redirectUris: [process.env.PRELLO_CLIENTURL],
      grant_types: 'password',
      scope: ''
    })
    defaultClient.save()
  }
})

let oauth = new OauthServer({
  model: require('./model.js'),
  grants: ['authorization_code', 'password', 'refresh_token', 'client_credentials'],
  requireClientAuthentication: {password: false}
})

module.exports = oauth
