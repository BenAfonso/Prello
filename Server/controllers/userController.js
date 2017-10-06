const mongoose = require('mongoose')
const User = mongoose.model('User')
const userController = {}
const secretKey = require('../config').secretKey
const jwt = require('jsonwebtoken')

userController.create = (user) => {
  return new Promise((resolve, reject) => {
    user.provider = 'jwt'
    user.save((err, user) => {
      if (err) return reject(err) // Error details
      return resolve(user)
    })
  })
}

userController.login = (email, password) => {
  return new Promise((resolve, reject) => {
    User.load({
      where: { email: email },
      select: 'name username email passwordHash salt'
    }, (err, user) => {
      if (err) reject(new Error('Bad request'))
      if (user) {
        if (user.authenticate(password)) {
          let payload = {
            id: user._id
          }
          let token = jwt.sign(payload, secretKey, { expiresIn: '7d' })
          resolve(token)
        } else {
          return reject(new Error('Wrong credentials'))
        }
      } else {
        return reject(new Error('User not found'))
      }
    })
  })
}
module.exports = userController
