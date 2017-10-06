const jwt = require('jsonwebtoken')
const secretKey = require('../../config').secretKey
const mongoose = require('mongoose')
const User = mongoose.model('User')

const decodeToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) reject(err)
      else resolve(decoded)
    })
  })
}

exports.requiresLogin = (req, res, next) => {
  let token = req.headers['x-access-token']
  if (token === undefined) {
    return res.status(401).send('No token provided')
  }

  decodeToken(token).then((decoded) => {
    User.findById(decoded.id, (err, user) => {
      if (err) { return res.status(400).send('No user found') }
      next()
    })
  }).catch(err => {
    return res.status(400).send(err)
  })
}

exports.board = {
  hasAuthorization: (req, res, next) => {
    next()
  },
  isCollaborator: (req, res, next) => {
    next()
  },
  isAdministrator: (req, res, next) => {
    next()
  }
}
