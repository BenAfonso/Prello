const mongoose = require('mongoose')
const User = mongoose.model('User')
const Team = mongoose.model('Team')

const userController = {}
const querystring = require('querystring')
const request = require('request')

userController.create = (user) => {
  return new Promise((resolve, reject) => {
    user.provider = 'jwt'
    user.save((err, user) => {
      if (err) return reject(err) // Error details
      return resolve(user)
    })
  })
}

userController.getOrCreateGoogleUser = (profile, accessToken) => {
  return new Promise((resolve, reject) => {
    User.findOne({'email': profile.emails[0].value}, '_id email provider').exec((err, user) => {
      if (err) return reject(err)
      if (!user) {
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.displayName.split(' ').join(''),
          provider: 'google',
          picture: profile.image.url,
          google: {
            ...profile._json,
            accessToken: accessToken
          }
        })
        user.save(err => {
          if (err) return reject(err)
          return resolve(user)
        })
      } else {
        return resolve(user)
      }
    })
  })
}

userController.getUsers = (email, limit, skip) => {
  return new Promise((resolve, reject) => {
    User.find({ email: new RegExp(email, 'i') }, { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }, { skip: skip, limit: limit }).exec(function (err, res) {
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
  return new Promise((resolve, reject) => {
    User.load({
      where: { email: userToConnect.email },
      select: 'name username email passwordHash salt provider'
    }, (err, user) => {
      if (err) return reject(new Error('Bad request'))
      if (user) {
        if (user.provider === 'google') {
          let error = new Error('Couldn\'t issue token for Google, sign in with Google')
          error.status = 403
          return reject(error)
        }
        let auth = 'Basic ' + Buffer.from(`${process.env.PRELLO_CLIENTID}:${process.env.PRELLO_SECRET}`).toString('base64')
        let form = {
          grant_type: 'password',
          username: user.email,
          password: userToConnect.password
        }
        let formData = querystring.stringify(form)
        request({
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': auth
          },
          uri: `${process.env.PRELLO_APIURL}/oauth/token`,
          body: formData,
          method: 'POST'
        }, function (err, res, body) {
          // TODO: refactor this
          if (err) { return reject(err) }
          let token = JSON.parse(body).accessToken
          if (token) {
            return resolve(token)
          } else {
            let error = new Error('Server error: Couldn\'t generate token')
            error.status = 500
            return reject(error)
          }
        })
      } else {
        let error = new Error('Wrong credentials')
        error.status = 403
        return reject(error)
      }
    })
  })
}

userController.getUserTeams = function (userId) {
  return new Promise((resolve, reject) => {
    Team.find({ 'users': userId }).populate('boards users admins', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

userController.updateUser = (userId, body) => {
  return new Promise((resolve, reject) => {
    delete body.email
    User.findOneAndUpdate('_id', body, { new: true }).exec((err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
module.exports = userController
