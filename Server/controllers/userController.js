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
userController.loginGoogle = (profile, done) => {
  User.findOne({'email': profile.emails[0].value}, '_id email provider').exec(function (err, user) {
    if (err) return done(err)
    if (!user) {
      user = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        username: profile.displayName.split(' ').join(''),
        provider: 'google',
        picture: profile.image.url,
        google: profile._json
      })
      user.save(function (err) {
        if (err) console.log(err)
        return done(err, user)
      })
    } else {
      return done(err, user)
    }
  })
}

userController.getUsers = (email) => {
  return new Promise((resolve, reject) => {
    User.find({ email: new RegExp(email, 'i') }, { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

userController.getUser = (id) => {
  return new Promise((resolve, reject) => {
    User.findOne({ '_id': id }, { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

userController.login = (userToConnect) => {
  console.log(userToConnect)
  return new Promise((resolve, reject) => {
    User.load({
      where: { email: userToConnect.email },
      select: 'name username email passwordHash salt'
    }, (err, user) => {
      if (err) reject(new Error('Bad request'))
      if (user) {
        if (userToConnect.provider === 'google' || user.authenticate(userToConnect.password)) {
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
