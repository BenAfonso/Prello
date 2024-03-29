const mongoose = require('mongoose')
const Board = mongoose.model('Board')
const userController = require('../../controllers/userController')
module.exports.boardExists = (req, res, next) => {
  Board.findOne({'_id': req.params.boardId}).exec((err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    if (result === null) {
      return res.status(404).send('Board not found')
    }
    next()
  })
}
module.exports.isCollaborator = (req, res, next) => {
  Board.findOne({'_id': req.params.boardId}).exec((err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    if (result === null) {
      return res.status(404).send('Board not found')
    }
    if (result.owner.toString !== req.user._id.toString) {
      next()
    } else {
      let collaborators = result.collaborators
      collaborators = collaborators.filter((c) => (c.toString() === req.user._id.toString()))
      if (collaborators.length > 0) {
        next()
      } else {
        userController.getUserTeams(req.user._id).then((teams) => {
          Board.findOne({'_id': req.params.boardId, 'teams': {$in: teams}}).exec((err, result) => {
            if (err) {
              return res.status(500).send(err)
            }
            if (result !== null) {
              return next()
            }

            return res.status(403).send('Forbidden: You aren\'t a collaborator of this board')
          })
        }).catch((err) => {
          return res.status(500).send(err)
        })
      }
    }
  })
}
module.exports.canRead = (req, res, next) => {
  Board.findOne({'_id': req.params.boardId}).exec((err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    let isPublic = result.visibility === 'public'
    let collaborator = result.collaborators.filter(c => c.toString() === req.user._id.toString())
    let isCollaborator = collaborator.length > 0
    let isOwner = result.owner.toString() === req.user._id.toString()

    if (isPublic || isCollaborator || isOwner) {
      next()
    } else {
      return res.status(403).send('Forbidden: You aren\'t allowed to see this board')
    }
  })
}
module.exports.isOwner = (req, res, next) => {
  Board.findOne({'_id': req.params.boardId}).exec((err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    if (result.owner.toString() === req.user._id.toString()) {
      next()
    } else {
      return res.status(403).send('Forbidden: You aren\'t owner of this board')
    }
  })
}
module.exports.hasListInside = (req, res, next) => {
  Board.findOne({'_id': req.params.boardId, 'lists': req.params.listId})
  .exec((err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    if (result === null) {
      return res.status(404).send('List not found in the board')
    }
    next()
  })
}
