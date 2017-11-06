const oauthServer = require('oauth2-server')
const Request = oauthServer.Request
const Response = oauthServer.Response
const mongoose = require('mongoose')
const OAuthClient = mongoose.model('OAuthClient')

const oauth = require('./index')
const bodyParser = require('body-parser')

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.all('/oauth/token', (req, res, next) => {
    var request = new Request(req)
    var response = new Response(res)
    oauth
      .token(request, response)
      .then(token => {
        return res.json(token)
      }).catch(err => {
        return res.status(500).json(err)
      })
  })

  app.post('/authorize', (req, res) => {
    var request = new Request(req)
    var response = new Response(res)

    return oauth.authorize(request, response).then(success => {
      res.json(success)
    }).catch(function (err) {
      res.status(err.code || 500).json(err)
    })
  })

  app.get('/authorize', (req, res) => {
    return OAuthClient.findOne({
      client_id: req.query.client_id,
      redirect_uri: req.query.redirect_uri
    }, ['id', 'name'])
      .then(model => {
        if (!model) return res.status(404).json({ error: 'Invalid Client' })
        return res.json(model)
      }).catch(function (err) {
        return res.status(err.code || 500).json(err)
      })
  })
}
