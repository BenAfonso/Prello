const mongoose = require('mongoose')
const User = mongoose.model('User')
const passport = require('passport')
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
