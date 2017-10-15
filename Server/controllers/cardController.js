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
        listController.addCardToList(req.params.listid, cardToAdd)
            .then((data) => {
              let cardToEmit = {
                card: item,
                listId: req.params.listid
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
    List.findOneAndUpdate({'_id': oldListId}, {$pull: {'cards': cardId}}, function (err, res) {
      if (err) {
        reject(err)
      } else {
        List.findOne({'_id': newListId}, function (err, res) {
          if (err) {
            reject(err)
          } else {
            let newCardLists = res.cards
            newCardLists.splice(position, 0, cardId)
            List.findOneAndUpdate({'_id': newListId}, {'cards': newCardLists}, function (error, result) {
              if (error) {
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
  })
}
module.exports = cardController
