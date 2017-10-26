const mongoose = require('mongoose')
const Card = mongoose.model('Card')
const cardController = require('./cardController')

const emit = require('../controllers/sockets').emit

const checklistController = {}

checklistController.createChecklist = (req) => {
  return new Promise((resolve, reject) => {
    Card.findOne({ '_id': req.params.cardId }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        res.checklists.push({text: req.body.text})
        res.save().then((result) => {
          cardController.refreshOneCard(req.params.boardId, req.params.listId, req.params.cardId).then((cardToEmit) => {
            resolve(cardToEmit)
          })
          .catch((err) => {
            reject(err)
          })
        })
        .catch((error) => {
          reject(error)
        })
      }
    })
  })
}
checklistController.createChecklistItem = (req) => {
  return new Promise((resolve, reject) => {
    Card.findOne({ '_id': req.params.cardId }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        res.checklists.id(req.params.checklistId).items.push({text: req.body.text})
        res.save().then((result) => {
          cardController.refreshOneCard(req.params.boardId, req.params.listId, req.params.cardId).then((cardToEmit) => {
            resolve(cardToEmit)
          })
          .catch((err) => {
            reject(err)
          })
        })
        .catch((error) => {
          reject(error)
        })
      }
    })
  })
}
checklistController.updateItem = (req) => {
  return new Promise((resolve, reject) => {
    Card.findOne({ '_id': req.params.cardId }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        if (req.body.text !== undefined) {
          res.checklists.id(req.params.checklistId).items.id(req.params.itemId).text = req.body.text
        }
        if (req.body.isChecked !== undefined) {
          res.checklists.id(req.params.checklistId).items.id(req.params.itemId).isChecked = req.body.isChecked
        }
        res.save().then((result) => {
          cardController.refreshOneCard(req.params.boardId, req.params.listId, req.params.cardId).then((cardToEmit) => {
            resolve(cardToEmit)
          })
          .catch((err) => {
            reject(err)
          })
        })
        .catch((error) => {
          reject(error)
        })
      }
    })
  })
}
checklistController.removeChecklistItem = (req) => {
  return new Promise((resolve, reject) => {
    Card.findOne({ '_id': req.params.cardId }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        res.checklists.id(req.params.checklistId).items.id(req.params.itemId).remove()
        res.save().then((result) => {
          console.log(result)
          cardController.refreshOneCard(req.params.boardId, req.params.listId, req.params.cardId).then((cardToEmit) => {
            resolve(cardToEmit)
          })
          .catch((err) => {
            reject(err)
          })
        })
        .catch((error) => {
          reject(error)
        })
      }
    })
  })
}
module.exports = checklistController
