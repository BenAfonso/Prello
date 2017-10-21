const mongoose = require('mongoose')
const Card = mongoose.model('Card')
module.exports.cardExists = (req, res, next) => {
  Card.findOne({'_id': req.params.cardId}).exec((err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    if (result === null) {
      return res.status(404).send('Card not found')
    }
    next()
  })
}
