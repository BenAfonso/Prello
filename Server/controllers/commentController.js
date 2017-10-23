const mongoose = require('mongoose')
const Comment = mongoose.model('Comment')
const emit = require('../controllers/sockets').emit
const cardController = require('./cardController')

const commentController = {}

commentController.createComment = (req) => {
  return new Promise((resolve, reject) => {
    req.body.author = req.user._id
    const commentToAdd = new Comment(req.body)
    commentToAdd.save((err, item) => {
      if (err) {
        reject(err)
      } else {
        cardController.addCommentToCard(req.params.cardId, commentToAdd)
            .then((data) => {
              cardController.getOneCard(req.params.cardId).then((cardToEmit) => {
                let payload = {
                  listId: req.params.listId,
                  card: cardToEmit
                }
                emit(req.params.boardId, 'NEW_COMMENT', payload)
                resolve(cardToEmit)
              })
              .catch((err) => {
                reject(err)
              })
            })
            .catch((err) => {
              reject(err)
            })
      }
    })
  })
}
module.exports = commentController
