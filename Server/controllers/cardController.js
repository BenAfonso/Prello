const mongoose = require('mongoose')
const Card = mongoose.model('Card')
const listController = require('./ListController')
const cardController = {}

cardController.createCard = (req) => {
  return new Promise((resolve, reject) => {
    if (req.params.listid === null) {
      reject(new Error('Missing boardID'))
    } else {
      const cardToAdd = new Card(req.body)
      cardToAdd.save((err, item) => {
        if (err) {
          reject(err)
        } else {
          listController.addCardToList(req.params.listid, cardToAdd)
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
module.exports = cardController
