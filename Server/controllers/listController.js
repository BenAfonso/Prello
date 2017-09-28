const mongoose = require('mongoose')
const List = mongoose.model('List')
const boardController = require('./boardController')

const listController = {}

listController.createList = function (req) {
  return new Promise((resolve, reject) => {
    if (req.params.id === null) {
      reject(new Error('Missing boardID'))
    } else {
      const listToAdd = new List(req.body)
      listToAdd.save((err, item) => {
        if (err) {
          reject(err)
        } else {
          boardController.addListToBoard(req.params.id, listToAdd)
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
module.exports = listController
