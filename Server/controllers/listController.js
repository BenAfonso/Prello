const mongoose = require('mongoose')
const List = mongoose.model('List')
const boardController = require('./boardController')

const listController = {}

listController.createList = function (req, res, next) {
  console.log(req)
  if (req.params.boardid === null) {
    res.status(500).send('Missing board ID')
  } else {
    const listToAdd = new List(req.body)
    listToAdd.save((err, item) => {
      if (err) {
        res.status(500).send(err)
      } else {
        boardController.addListToBoard(req.params.boardid, listToAdd)
          .then((data) => {
            res.status(200).json(data)
          })
          .catch((err) => {
            res.status(500).send(err)
          })
      }
    })
  }
}
module.exports = listController
