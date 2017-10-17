const jwt = require('jsonwebtoken')
const secretKey = require('../../config').secretKey
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Board = mongoose.model('Board')

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
    console.log(err)
    return res.status(400).send(err)
  })
}

exports.board = {
  boardExists: (req, res, next) => {
    Board.findOne({'_id': req.params.boardId}).exec((err, result) => {
      if (err) {
        return res.status(500).send(err)
      }
      if (result === null) {
        return res.status(404).send('Board not found')
      }
      next()
    })
  },
  isCollaborator: (req, res, next) => {
    Board.findOne({'_id': req.params.boardId}).exec((err, result) => {
      if (err) {
        return res.status(500).send(err)
      }
      let collaborators = result.collaborators
      collaborators = collaborators.filter((c) => (c.toString() === req.user._id.toString()))
      if (collaborators.length > 0) {
        next()
      } else {
        return res.status(403).send('Forbidden: You aren\'t a collaborator of this board')
      }
    })
  },
  canEdit: (req, res, next) => {
    next()
  },
  canDelete: (req, res, next) => {
    next()
  },
  canRead: (req, res, next) => {
    next()
  },
  isOwner: (req, res, next) => {
    Board.findOne({'_id': req.params.boardId}).exec((err, result) => {
      if (err) {
        return res.status(500).send(err)
      }
      console.log(result.owner)
      if (result.owner.toString() === req.user._id.toString()) {
        next()
      } else {
        return res.status(403).send('Forbidden: You aren\'t owner of this board')
      }
    })
  }
}
