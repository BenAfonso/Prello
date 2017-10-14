const mongoose = require('mongoose')
const Card = mongoose.model('Card')
const listController = require('./listController')
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
module.exports = cardController
