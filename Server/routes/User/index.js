const mongoose = require('mongoose')
const User = mongoose.model('User')
const passport = require('passport')

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

  router.get('/auth/google/callback',
    passport.authenticate('google', { session: false }),
    function (req, res) {
      // Authenticated successfully

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
