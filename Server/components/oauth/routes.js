const oauthServer = require('oauth2-server')
const Request = oauthServer.Request
const Response = oauthServer.Response
const mongoose = require('mongoose')
const OAuthClient = mongoose.model('OAuthClient')
const OAuthAuthorizationCode = mongoose.model('OAuthAuthorizationCode')
const crypto = require('crypto')
const oauth = require('./index')
const oauthModel = require('./model')
const bodyParser = require('body-parser')
const {requiresLogin} = require('../../config/middlewares/authorization')
const userController = require('../../controllers/userController')

module.exports = function (app) {
  app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization')
    if (req.method === 'OPTIONS') {
      res.status(200).end()
    } else {
      next()
    }
  })
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.set('view engine', 'ejs')
  app.all('/oauth/token', (req, res, next) => {
    var request = new Request(req)
    var response = new Response(res)
    oauth
      .token(request, response)
      .then(token => {
        return res.json(token)
      }).catch(err => {
        console.error(err)
        return res.status(err.status).json(err)
      })
  })

  app.get('/oauth/prello/login', (req, res) => {
    return res.render('login', {
      redirect_uri: req.url,
      email: '',
      error: ''
    })
  })

  app.post('/oauth/prello/login', (req, res, next) => {
    const user = {email: req.body.email, password: req.body.password}
    userController.login(user).then(token => {
      const auth = `Bearer ${token}`
      req.method = 'get'
      req.headers['authorization'] = auth
      req.url = `/authorize?client_id=${req.query.client_id}&redirect_uri=${req.query.redirect_uri}`
      next()
    }).catch(err => {
      console.error(err)
      return res.render('login', { // views: login
        redirect_uri: req.redirect_uri,
        email: req.body.email || '',
        error: 'Invalid credentials'
      })
    })
  })

  app.post('/auth/google/callback', (req, res, next) => {
    oauthModel.validateGoogleCode(req.body.code, req.headers.origin).then(result => {
      userController.getOrCreateGoogleUser(result.profile, result.accessToken).then(user => {
        oauthModel.getClient(process.env.PRELLO_CLIENTID, process.env.PRELLO_SECRET).then(client => {
          let date = new Date()
          let token = {
            accessToken: oauthModel.generateAccessToken(client, user, '').toString(),
            accessTokenExpiresAt: date.setDate(date.getDate() + 7)
          }
          oauthModel.saveToken(token, client, user).then(result => {
            return res.status(200).send({ token: result.accessToken })
          })
        })
      })
    }).catch(err => {
      return res.status(400).send(err) // Change code 400
    })
  })

  app.post('/authenticate', (req, res) => {
    let request = new Request(req)
    let response = new Response(res)
    return oauth.authenticate(request, response).then(success => {
      res.json(success)
    }).catch(function (err) {
      res.status(err.code || 500).json(err)
    })
  })

  app.post('/oauth/clients', [requiresLogin], (req, res) => {
    crypto.randomBytes(10, (err, buffer) => {
      if (err) { }
      const clientId = buffer.toString('hex')
      crypto.randomBytes(10, (err, buffer) => {
        if (err) { }
        const clientSecret = buffer.toString('hex')
        req.body.client_id = clientId
        req.body.client_secret = clientSecret
        req.body.grant_types = 'authorization_code'
        req.body.User = req.user._id
        const client = new OAuthClient(req.body)
        client.save()
        .then((client) => {
          res.status(201).send(client)
        })
        .catch((err) =>
          res.status(400).send({
            status: '400',
            message: err.message
          })
        )
      })
    })
  })

  app.get('/authorize', [requiresLogin], (req, res) => {
    crypto.randomBytes(15, (err, buffer) => {
      if (err) { return res.status(err.code || 500).json(err) }
      const code = buffer.toString('hex')
      OAuthClient.findOne({
        client_id: req.query.client_id,
        redirectUris: req.query.redirect_uri
      }, ['id'])
      .then(client => {
        const oauthCode = new OAuthAuthorizationCode({
          authorization_code: code,
          expires: Date.now() + 1286400000,
          redirect_uri: req.query.redirect_uri,
          scope: req.query.scope,
          User: req.user._id,
          OAuthClient: client.id
        })
        oauthCode.save().then(code => {
          res.redirect(`${req.query.redirect_uri}?code=${code.authorization_code}`)
        }).catch(err => {
          return res.status(err.code || 500).json(err)
        })
      }).catch(err => {
        return res.status(err.code || 500).json(err)
      })
    })
  })

  app.get('/oauth/clients', [requiresLogin], (req, res) => {
    OAuthClient.find({ User: req.user._id }).then(clients => {
      res.status(200).send(clients)
    }).catch((err) =>
      res.status(400).send({
        status: '400',
        message: err.message
      })
    )
  })
}
