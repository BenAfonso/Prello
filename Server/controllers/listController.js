const mongoose = require('mongoose')
const List = mongoose.model('List')
const boardController = require('./boardController')
const listController = {}
const emit = require('../controllers/sockets').emit

listController.createList = (req) => {
  return new Promise((resolve, reject) => {
    const listToAdd = new List(req.body)
    listToAdd.save((err, item) => {
      if (err) {
        reject(err)
      } else {
        boardController.addListToBoard(req.params.boardId, listToAdd)
            .then((data) => {
              emit(req.params.boardId, 'NEW_LIST', item)
              resolve(item)
            })
            .catch((err) => {
              reject(err)
            })
      }
    })
  })
}
listController.removeList = (req) => {
  return new Promise((resolve, reject) => {
    if (req.params.boardIsd === null) {
      reject(new Error('Missing boardID'))
      return
    }
    if (req.params.listId === null) {
      reject(new Error('Missing listID'))
      return
    }
    List.findOneAndRemove({ '_id': req.params.listId }, (err, item) => {
      if (err) {
        reject(err)
      } else {
        boardController.removeListFromBoard(req.params.boardId, req.params.listId)
          .then((data) => {
            emit(req.params.boardId, 'REMOVE_LIST', item)
            resolve(item)
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  })
}
listController.updateList = (req) => {
  return new Promise((resolve, reject) => {
    if (req.params.boardId === null) {
      reject(new Error('Missing boardID'))
      return
    }
    if (req.params.listId === null) {
      reject(new Error('Missing listID'))
      return
    }
    List.update({ '_id': req.params.listId }, req.body, (err, item) => {
      if (err) {
        return reject(err)
      } else {
        // TODO: Log update to history
        return resolve(item)
      }
    })
  })
}
listController.addCardToList = function (listId, card) {
  return new Promise((resolve, reject) => {
    List.findOneAndUpdate({'_id': listId}, {$push: {cards: card}}, {new: true}, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
module.exports = listController
