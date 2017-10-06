const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (router, userController) => {
  router.post('/register', (req, res) => {
    const user = new User(req.body)
    userController.create(user).then(user => {
      if (!req.query.withLogin) {
        return res.status(201).send('Account created!')
      }
      userController.login(req.body.email, req.body.password).then(token => {
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
    userController.login(req.body.email, req.body.password).then(token => {
      return res.status(200).send({
        token: token
      })
    }).catch(err => {
      return res.status(400).send(err)
    })
  })
}
