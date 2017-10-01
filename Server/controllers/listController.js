const mongoose = require('mongoose')
const List = mongoose.model('List')
const boardController = require('./boardController')
const listController = {}

listController.createList = function (req) {
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
listController.removeList = function (req) {
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
module.exports = listController
