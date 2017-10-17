const mongoose = require('mongoose')
const Card = mongoose.model('Card')
const List = mongoose.model('List')

const listController = require('./listController')
const boardController = require('./boardController')

const emit = require('../controllers/sockets').emit

const cardController = {}

cardController.createCard = (req) => {
  return new Promise((resolve, reject) => {
    const cardToAdd = new Card(req.body)
    cardToAdd.save((err, item) => {
      if (err) {
        reject(err)
      } else {
        listController.addCardToList(req.params.listId, cardToAdd)
            .then((data) => {
              let cardToEmit = {
                card: item,
                listId: req.params.listId
              }
              emit(req.params.boardId, 'NEW_CARD', cardToEmit)
              resolve(item)
            })
            .catch((err) => {
              reject(err)
            })
      }
    })
  })
}
cardController.moveCard = (req) => {
  return new Promise((resolve, reject) => {
    let boardId = req.params.boardId
    let cardId = req.params.cardId
    let position = req.body.position
    let newListId = req.body.newListId
    let oldListId = req.body.oldListId
    List.findOne({'_id': oldListId, 'cards': cardId}).exec((err, res) => {
      if (err) {
        err.status = 500
        reject(err)
        return
      }
      if (res !== null) {
        let err = new Error('CardId not inside the oldlist')
        err.status = 404
        reject(err)
      } else {
        List.findOneAndUpdate({'_id': oldListId}, {$pull: {'cards': cardId}}, function (err, res) {
          if (err) {
            err.status = 500
            reject(err)
          } else {
            List.findOne({'_id': newListId}, function (err, res) {
              if (err) {
                err.status = 500
                reject(err)
              } else {
                let newCardLists = res.cards
                newCardLists.splice(position, 0, cardId)
                List.findOneAndUpdate({'_id': newListId}, {'cards': newCardLists}, function (error, result) {
                  if (error) {
                    error.status = 500
                    reject(error)
                  } else {
                    boardController.refreshOneboard('CARD_MOVED', boardId)
                    resolve(result.cards)
                  }
                })
              }
            })
          }
        })
      }
    })
  })
}
module.exports = cardController
