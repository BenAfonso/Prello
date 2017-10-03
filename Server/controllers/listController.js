const mongoose = require('mongoose')
const List = mongoose.model('List')
const boardController = require('./boardController')
const listController = {}

listController.createList = (req) => {
  return new Promise((resolve, reject) => {
    if (req.params.boardid === null) {
      reject(new Error('Missing boardID'))
    } else {
      const listToAdd = new List(req.body)
      listToAdd.save((err, item) => {
        if (err) {
          reject(err)
        } else {
          boardController.addListToBoard(req.params.boardid, listToAdd)
            .then((data) => {
              resolve(item)
            })
            .catch((err) => {
              reject(err)
            })
        }
      })
    }
  })
}
listController.removeList = (req) => {
  return new Promise((resolve, reject) => {
    if (req.params.boardid === null) {
      reject(new Error('Missing boardID'))
      return
    }
    if (req.params.listid === null) {
      reject(new Error('Missing listID'))
      return
    }
    List.findOneAndRemove({ '_id': req.params.listid }, (err, item) => {
      if (err) {
        reject(err)
      } else {
        boardController.removeListFromBoard(req.params.boardid, req.params.listid)
          .then((data) => {
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
