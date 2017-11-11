const mongoose = require('mongoose')
const User = mongoose.model('User')
const request = require('request')
const {requiresLogin} = require('../../config/middlewares/authorization')

/**
  * @swagger
  * definitions:
  *   NewUser:
  *     properties:
  *       email:
  *         type: string
  *       password:
  *         type: string
  *       username:
  *         type: string
  *       name:
  *         type: string
  */

/**
    * @swagger
    * definitions:
    *   LoginForm:
    *     properties:
    *       email:
    *         type: string
    *       password:
    *         type: string
    */
module.exports = (router, userController) => {
  router.post('/auth/google/callback',
    function (req, res) {
      if (req.params.code === undefined) {
        const data = {
          code: req.body.code,
          client_id: '532471730394-bh1qi5q6hkh0c13quao0ptplp8sidfjb.apps.googleusercontent.com',
          client_secret: '1YYKI6q6wMsrZNl45ALgL1w2',
          redirect_uri: req.headers.origin,
          scope: 'email profile',
          grant_type: 'authorization_code'}
        request({method: 'post', url: 'https://accounts.google.com/o/oauth2/token', form: data}, (error, response) => {
          if (!error && response.statusCode === 200) {
            let accessToken = JSON.parse(response.body).access_token
            request({method: 'get', url: `https://www.googleapis.com/plus/v1/people/me?access_token=${accessToken}`}, (err, profile) => {
              if (!profile) { return res.status(404).send('Google profile not found.') }
              userController.loginGoogle(JSON.parse(profile.body), (err, user) => {
                if (err) return res.status(400).send(err)
                let userToLog = new User({
                  provider: 'google',
                  email: user.email
                })
                userController.login(userToLog).then(token => {
                  return res.status(200).send({
                    token: token
                  })
                }).catch(err => {
                  return res.status(400).send(err)
                })
              })
              if (err) {
                return res.status(400).send(err)
              }
            })
          } else {
            return res.status(400).send(error)
          }
        })
      }
    })

  /**
    * @swagger
    * /register:
    *   post:
    *     tags:
    *       - Authentication
    *     description: Register for a new account
    *     summary: CREATE a new user
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: body
    *         description: The user object to be added
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/NewUser'
    *     responses:
    *       201:
    *         description: Message confirming the Account has been created
    *       500:
    *         description: Internal error
    */
  router.post('/register', (req, res) => {
    const user = new User(req.body)
    userController.create(user).then(user => {
      if (!req.query.withLogin) {
        return res.status(201).send('Account created!')
      }
      userController.login(user).then(token => {
        return res.status(201).send({token: token})
      }).catch(err => {
        return res.status(400).send(err)
      })
    }).catch(err => {
      console.error(err)
      return res.status(400).send('Bad request') // TODO: Error details
    })
  })

  /**
      * @swagger
      * /login:
      *   post:
      *     tags:
      *       - Authentication
      *     description: Login to an account
      *     summary: Generate a token
      *     produces:
      *       - application/json
      *     parameters:
      *       - name: body
      *         description: The login form
      *         in: body
      *         required: true
      *         schema:
      *             $ref: '#/definitions/LoginForm'
      *     responses:
      *       200:
      *         description: Token
      *       500:
      *         description: Internal error
      */
  router.post('/login', function (req, res) {
    let user = new User({
      provider: 'local',
      email: req.body.email,
      password: req.body.password
    })
    userController.login(user).then(token => {
      return res.status(200).send({
        token: token
      })
    }).catch(err => {
      return res.status(400).send(err)
    })
  })

  router.get('/users', function (req, res) {
    // TODO: ADD Pagination
    userController.getUsers(req.query.email, parseInt(req.query.limit), parseInt(req.query.skip)).then(users => {
      return res.status(200).send(users)
    }).catch(err => {
      console.log(err)
      return res.status(400).send(err)
    })
  })

  router.get('/users/:userId', requiresLogin, function (req, res) {
    userController.getUser(req.params.userId).then(user => {
      return res.status(200).send(user)
    }).catch(err => {
      return res.status(400).send(err)
    })
  })

  router.get('/users/:userId/teams', requiresLogin, function (req, res) {
    userController.getUserTeams(req.params.userId).then(teams => {
      return res.status(200).send(teams)
    }).catch(err => {
      return res.status(400).send(err)
    })
  })

  router.put('/users/:userId', requiresLogin, function (req, res) {
    console.log(req.params.userId)
    console.log(req.user._id)
    if (req.params.userId.toString() === req.user._id.toString()) {
      userController.updateUser(req.params.userId, req.body).then(user => {
        return res.status(200).send(user)
      }).catch(err => {
        return res.status(400).send(err)
      })
    } else {
      return res.status(403).send('Wrong user')
    }
  })
}
