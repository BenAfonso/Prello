const mongoose = require('mongoose')
const Board = mongoose.model('Board')

const boardController = {}

boardController.getAllBoards = function () {
  return new Promise((resolve, reject) => {
    Board.find().populate('owner lists collaborators').exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
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

module.exports = boardController
