const mongoose = require('mongoose')
const User = mongoose.model('User')
const {requiresLogin} = require('../../config/middlewares/authorization')
const modificationController = require('../../controllers/modificationController')

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
      email: req.body.email,
      password: req.body.password
    })
    userController.login(user).then(token => {
      return res.status(200).send({
        token: token
      })
    }).catch(err => {
      return res.status(err.status).send(err.message)
    })
  })

  router.get('/users', function (req, res) {
    // TODO: ADD Pagination
    userController.getUsers(req.query.email, parseInt(req.query.limit), parseInt(req.query.skip)).then(users => {
      return res.status(200).send(users)
    }).catch(err => {
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

  router.get('/users/:userId/history', [requiresLogin], (req, res) => {
    modificationController.findUserHistory(req.params.userId, parseInt(req.query.limit), parseInt(req.query.skip)).then(history => {
      return res.status(200).send(history)
    }).catch(err => {
      return res.status(400).send(err)
    })
  })
}
