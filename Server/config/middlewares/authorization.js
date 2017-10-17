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
  let authorizationHeader = req.headers['authorization']
  if (authorizationHeader === undefined) {
    return res.status(401).send('No token provided')
  }
  authorizationHeader = authorizationHeader.split(' ')

  if (authorizationHeader[0] !== 'Bearer') {
    return res.status(401).send('Bearer token needed')
  }
  if (authorizationHeader[1] === undefined) {
    return res.status(401).send('No token provided')
  }
  let token = authorizationHeader[1]
  decodeToken(token).then((decoded) => {
    User.findById(decoded.id, (err, user) => {
      if (err) { return res.status(400).send('No user found') }
      req.user = user
      next()
    })
  }).catch(err => {
    return res.status(400).send(err)
  })
}
