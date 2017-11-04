const mongoose = require('mongoose')
const Comment = mongoose.model('Comment')
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
              cardController.refreshOneCard(req.params.boardId, req.params.listId, req.params.cardId).then((cardToEmit) => {
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
commentController.removeComment = (boardId, listId, cardId, commentId) => {
  return new Promise((resolve, reject) => {
    Comment.findOneAndRemove({ '_id': commentId }, (err, item) => {
      if (err) {
        reject(err)
      } else {
        cardController.removeCommentFromCard(cardId, commentId)
          .then((data) => {
            cardController.refreshOneCard(boardId, listId, cardId).then((cardToEmit) => {
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

commentController.updateComment = (req) => {
  return new Promise((resolve, reject) => {
    Comment.update({ '_id': req.params.commentId }, req.body, (err, item) => {
      if (err) {
        return reject(err)
      } else {
        cardController.refreshOneCard(req.params.boardId, req.params.listId, req.params.cardId).then((cardToEmit) => {
          resolve(cardToEmit)
        })
        .catch((err) => {
          reject(err)
        })
      }
    })
  })
}
module.exports = commentController
