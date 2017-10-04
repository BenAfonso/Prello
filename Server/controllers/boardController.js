const mongoose = require('mongoose')
const Board = mongoose.model('Board')
const Card = mongoose.model('Card')
const Util = require('./Util')
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
boardController.moveList = function (req) {
  return new Promise((resolve, reject) => {
    if (req.params.boardId === null) {
      reject(new Error('Missing boardID'))
      return
    }
    let boardId = req.params.boardId
    if (req.params.listId === null) {
      reject(new Error('Missing listID'))
      return
    }
    let listId = req.params.listId

    if (req.body.position === null) {
      reject(new Error('Missing Position'))
      return
    }
    let position = req.body.position
    Board.findOne({ '_id': boardId }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        let indexList = res.lists.indexOf(listId)
        if (indexList === -1) {
          reject(new Error('List ID not found in the board'))
          return
        }
        let newLists = Util.moveInsideAnArray(res.lists, indexList, position)
        Board.findOneAndUpdate({'_id': boardId}, {'lists': newLists}, {new: true}, function (err, res) {
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

module.exports = boardController
