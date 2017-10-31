const mongoose = require('mongoose')
const List = mongoose.model('List')

module.exports.listExists = (req, res, next) => {
  List.findOne({'_id': req.params.listId}).exec((err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    if (result === null) {
      return res.status(404).send('List not found')
    }
    next()
  })
}
module.exports.hasCardInside = (req, res, next) => {
  List.findOne({'_id': req.params.listId, 'cards': req.params.cardId})
    .exec((err, result) => {
      if (err) {
        return res.status(500).send(err)
      }
      if (result === null) {
        return res.status(404).send('Card not found in the list')
      }
      next()
    })
}
