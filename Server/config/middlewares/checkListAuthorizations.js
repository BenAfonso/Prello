const mongoose = require('mongoose')
const Card = mongoose.model('Card')
module.exports.checkListExists = (req, res, next) => {
  Card.findOne({'_id': req.params.cardId}).exec((err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    if (result.checklists.id(req.params.checklistId) === null) {
      return res.status(404).send('Checklist not found')
    }
    next()
  })
}
module.exports.itemExists = (req, res, next) => {
  Card.findOne({'_id': req.params.cardId}).exec((err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    if (result.checklists.id(req.params.checklistId).items.id(req.params.itemId) === null) {
      return res.status(404).send('Item not found')
    }
    next()
  })
}
