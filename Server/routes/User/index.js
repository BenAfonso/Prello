const mongoose = require('mongoose')
const User = mongoose.model('User')
const passport = require('passport')
const request = require('request')

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
  router.get('/auth/google',
    passport.authenticate('google', { scope: ['email profile'] }))

  router.post('/auth/google/callback',
    function (req, res) {
      console.log(req.body.code)
      // Authenticated successfully
      let requestUrl = `http://accounts.google.com/o/oauth2/token?code=${req.body.code}&redirect_uri=localhost:3333/auth/google/callback&client_id=970457604836-o50jesfa5lblnger6egce7v32p8pukjq.apps.googleusercontent.com&client_secret=7Uk8k3OQ2GKTpQYUo09Jyxif&scope=email&grant_type=authorization_code`
      request.post(requestUrl, function (error, response, body) {
        console.log(response)
        if (!error && response.statusCode === 200) {
          console.log(body)
        }
      })
      console.log(req.user)
      let user = new User({
        provider: 'google',
        email: req.user.email
      })
      userController.login(user).then(token => {
        return res.status(200).send({
          token: token
        })
      }).catch(err => {
        return res.status(400).send(err)
      })
    })
  router.get('/auth/google/callback', function (req, res) {
    
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
}
