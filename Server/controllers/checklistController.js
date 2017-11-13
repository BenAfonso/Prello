const mongoose = require('mongoose')
const Card = mongoose.model('Card')
const Checklist = mongoose.model('Checklist')
const cardController = require('./cardController')

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
checklistController.updateChecklist = (req) => {
  return new Promise((resolve, reject) => {
    Card.findOne({ '_id': req.params.cardId }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        if (req.body.text !== undefined) {
          res.checklists.id(req.params.checklistId).text = req.body.text
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
checklistController.removeChecklist = (req) => {
  return new Promise((resolve, reject) => {
    Card.findOne({ '_id': req.params.cardId }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        res.checklists.id(req.params.checklistId).remove()
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

/**
 * @param {any} cardId
 * @param {any} labelId
 * @returns
 */
checklistController.addItemToChecklist = function (cardId, checklistId, itemName) {
  return new Promise((resolve, reject) => {
    Card.findOne({ '_id': cardId }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        res.checklists.id(checklistId).items.push({text: itemName})
        res.save()
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
          if (req.body.isChecked) {
            res.checklists.id(req.params.checklistId).items.id(req.params.itemId).doneDate = Date.now()
          } else {
            res.checklists.id(req.params.checklistId).items.id(req.params.itemId).doneDate = null
          }
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
