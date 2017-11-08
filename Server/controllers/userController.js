const mongoose = require('mongoose')
const User = mongoose.model('User')
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
      select: 'name username email passwordHash salt'
    }, (err, user) => {
      if (err) reject(new Error('Bad request'))
      if (user) {
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
          if (err) { reject(err) }
          resolve(JSON.parse(body).accessToken)
        })

        /* if (userToConnect.provider === 'google' || user.authenticate(userToConnect.password)) {
          let payload = {
            id: user._id
          }
          let token = jwt.sign(payload, secretKey, { expiresIn: '7d' })
          resolve(token)
        } else {
          return reject(new Error('Wrong credentials'))
        } */
      } else {
        return reject(new Error('User not found'))
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
