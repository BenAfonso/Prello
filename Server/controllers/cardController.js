const mongoose = require('mongoose')
const Card = mongoose.model('Card')
const List = mongoose.model('List')
const User = mongoose.model('User')

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
cardController.removeCard = (boardId, listId, cardId) => {
  return new Promise((resolve, reject) => {
    Card.findOneAndRemove({ '_id': cardId }, (err, item) => {
      if (err) {
        reject(err)
      } else {
        listController.removeCardFromList(listId, cardId)
          .then((data) => {
            boardController.refreshOneboard('CARD_DELETED', boardId)
            resolve(item)
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  })
}
cardController.updateCard = (req) => {
  return new Promise((resolve, reject) => {
    Card.update({ '_id': req.params.cardId }, req.body, (err, item) => {
      if (err) {
        return reject(err)
      } else {
        cardController.getOneCard(req.params.cardId).then((cardToEmit) => {
          let payload = {
            listId: req.params.listId,
            card: cardToEmit
          }
          emit(req.params.boardId, 'CARD_UPDATED', payload)
          return resolve(item)
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
      if (res === null) {
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

cardController.addCommentToCard = (cardId, commentToAdd) => {
  return new Promise((resolve, reject) => {
    Card.findOneAndUpdate({'_id': cardId}, {$push: {comments: commentToAdd}}, {new: true}, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

cardController.removeCommentFromCard = (cardId, commentId) => {
  return new Promise((resolve, reject) => {
    Card.findOneAndUpdate({'_id': cardId}, {$pull: {comments: commentId}}, {new: true}, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
cardController.getOneCard = (cardId) => {
  return new Promise((resolve, reject) => {
    Card.findOne({ '_id': cardId }).populate('comments responsible collaborators', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        User.populate(res, {
          path: 'comments.author',
          select: { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }
        }, function (err, res) {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        })
      }
    })
  })
}
cardController.addCollaborator = (boardId, cardId, listId, userId, requesterId) => {
  return new Promise((resolve, reject) => {
    Card.findOneAndUpdate({ '_id': cardId }, { $push: { collaborators: userId } }, { new: true }).populate('collaborators').exec((err, res) => {
      if (err) {
        err.status = 500
        reject(err)
      } else {
        cardController.getOneCard(cardId).then((cardToEmit) => {
          let payload = {
            listId: listId,
            card: cardToEmit
          }
          emit(boardId, 'CARD_UPDATED', payload)
          resolve(cardToEmit)
        })
        .catch((err) => {
          err.status = 500
          reject(err)
        })
      }
    })
  })
}

cardController.addCollaboratorEmail = (boardId, cardId, listId, email, requesterId) => {
  return new Promise((resolve, reject) => {
    console.log(email)
    User.findOne({ email: email }).then((res) => {
      if (res) {
        cardController.addCollaborator(boardId, cardId, listId, res._id, requesterId).then(res => {
          resolve(res)
        }).catch(err => {
          err.status = 500
          reject(err)
        })
      } else {
        let err = new Error('Not found')
        err.status = 404
//        return reject(err)
      }
    }).catch((err) => {
      err.status = 500
      reject(err)
    })
  })
}
module.exports = cardController
