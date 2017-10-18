const mongoose = require('mongoose')
const Board = mongoose.model('Board')
const Card = mongoose.model('Card')
const Util = require('./Util')
const emit = require('../controllers/sockets').emit
const boardController = {}

/**
 *
 *
 * @returns
 */
boardController.getAllBoards = function () {
  return new Promise((resolve, reject) => {
    Board.find().populate('owner lists collaborators', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        Card.populate(res, {
          path: 'lists.cards'
        }, function (err, res) {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        })
      }
    })
  })
}
boardController.getUserBoards = function (userId) {
  return new Promise((resolve, reject) => {
    Board.find({ $or: [{ 'owner': userId }, { 'collaborators': userId }] }).populate('owner lists collaborators', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        Card.populate(res, {
          path: 'lists.cards'
        }, function (err, res) {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        })
      }
    })
  })
}

/**
 *
 * @param {any} board
 * @returns
 */
boardController.createBoard = function (board) {
  return new Promise((resolve, reject) => {
    const boardToAdd = new Board(board)
    boardToAdd.save((err, item) => {
      if (err) {
        reject(err)
      } else {
        emit('testID', 'NEW_BOARD', item)
        resolve(item)
      }
    })
  })
}

/**
 *
 *
 * @param {any} boardId
 * @param {any} list
 * @returns
 */
boardController.addListToBoard = function (boardId, list) {
  return new Promise((resolve, reject) => {
    Board.findOneAndUpdate({ '_id': boardId }, { $push: { lists: list } }, { new: true }, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

/**
 *
 *
 * @param {any} boardId
 * @param {any} listId
 * @returns
 */
boardController.removeListFromBoard = function (boardId, listId) {
  return new Promise((resolve, reject) => {
    Board.findOneAndUpdate({ '_id': boardId }, { $pull: { 'lists': listId } }, { new: true }, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

/**
 *
 *
 * @param {any} boardId
 * @returns
 */
boardController.getOneboard = function (boardId, userId) {
  return new Promise((resolve, reject) => {
    Board.findOne({ '_id': boardId }).populate('owner lists collaborators', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
      if (err) {
        err.status = 500
        reject(err)
      } else {
        let collaborators = res.collaborators
        collaborators = collaborators.filter((x) => (x._id.toString() === userId.toString()))
        if (res.owner._id.toString() !== userId.toString() && res.visibility !== 'public' && collaborators.length === 0) {
          err = new Error('Unauthorize user')
          err.status = 403
          reject(err)
        } else {
          Card.populate(res, {
            path: 'lists.cards'
          }, function (err, res) {
            if (err) {
              err.status = 500
              reject(err)
            } else {
              resolve(res)
            }
          })
        }
      }
    })
  })
}

/**
 *
 * Moves a list in the board
 * @param {any} req
 * @returns The new lists
 */
boardController.moveList = function (req) {
  return new Promise((resolve, reject) => {
    let boardId = req.params.boardId
    let listId = req.params.listId
    let position = req.body.position
    Board.findOne({ '_id': boardId }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        let indexList = res.lists.indexOf(listId)
        let newLists = Util.moveInsideAnArray(res.lists, indexList, position)
        Board.findOneAndUpdate({ '_id': boardId }, { 'lists': newLists }, { new: true }).populate('lists').exec((err, res) => {
          if (err) {
            reject(err)
          }
          Card.populate(res, {
            path: 'lists.cards'
          }, function (err, res) {
            if (err) {
              reject(err)
            } else {
              emit(boardId, 'LIST_MOVED', res.lists)
              resolve(res.lists)
            }
          })
        })
      }
    })
  })
}

boardController.refreshOneboard = function (action, boardId) {
  Board.findOne({ '_id': boardId }).populate('owner lists collaborators', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
    if (err) { } else {
      Card.populate(res, {
        path: 'lists.cards'
      }, function (err, res) {
        if (err) { } else {
          emit(boardId, action, res.lists)
        }
      })
    }
  })
}
boardController.addCollaborator = (boardId, userId, requesterId) => {
  return new Promise((resolve, reject) => {
    Board.findOneAndUpdate({ '_id': boardId }, { $push: { collaborators: userId } }, { new: true }, function (err, res) {
      if (err) {
        err.status = 500
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
boardController.removeCollaborator = (boardId, userId, requesterId) => {
  return new Promise((resolve, reject) => {
    Board.findOneAndUpdate({ '_id': boardId }, { $pull: { collaborators: userId } }, { new: true }, function (err, res) {
      if (err) {
        err.status = 500
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

boardController.addCollaborators = (board, users) => {

}

module.exports = boardController
