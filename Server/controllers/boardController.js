const mongoose = require('mongoose')
const Board = mongoose.model('Board')
const Card = mongoose.model('Card')
const Util = require('./Util')
const emit = require('../controllers/sockets').emit
const boardController = {}

boardController.getAllBoards = function () {
  return new Promise((resolve, reject) => {
    Board.find().populate('owner lists collaborators').exec(function (err, res) {
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
boardController.addListToBoard = function (boardId, list) {
  return new Promise((resolve, reject) => {
    Board.findOneAndUpdate({'_id': boardId}, {$push: {lists: list}}, {new: true}, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
boardController.removeListFromBoard = function (boardId, listId) {
  return new Promise((resolve, reject) => {
    Board.findOneAndUpdate({'_id': boardId}, {$pull: {'lists': listId}}, {new: true}, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
boardController.getOneboard = function (boardId) {
  return new Promise((resolve, reject) => {
    Board.findOne({ '_id': boardId }).populate('owner lists collaborators').exec(function (err, res) {
      if (err) {
        err.status = 500
        reject(err)
      } else {
        if (res === null) {
          err = new Error('board id not found')
          err.status = 404
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
        if (indexList === -1) {
          reject(new Error({status: 500, text: 'List ID not found in the board'}))
          return
        }
        let newLists = Util.moveInsideAnArray(res.lists, indexList, position)
        Board.findOneAndUpdate({'_id': boardId}, {'lists': newLists}, {new: true}).populate('lists').exec((err, res) => {
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

module.exports = boardController
