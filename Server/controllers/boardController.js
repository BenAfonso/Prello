const mongoose = require('mongoose')
const Board = mongoose.model('Board')
const User = mongoose.model('User')
const Label = mongoose.model('Label')
const Modification = mongoose.model('Modification')
const List = mongoose.model('List')
const Card = mongoose.model('Card')
const Util = require('./Util')
const emit = require('../controllers/sockets').emit
const modificationController = require('./modificationController')
const listController = require('./listController')
const boardController = {}

/**
 *
 *
 * @returns
 */
boardController.getAllBoards = function () {
  return new Promise((resolve, reject) => {
    Board.find().populate('owner lists labels collaborators', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        Card.populate(res, {
          path: 'lists.cards'
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

boardController.getUserBoards = function (userId) {
  return new Promise((resolve, reject) => {
    Board.find({ $or: [{ 'owner': userId }, { 'collaborators': userId }] }).populate('owner lists labels collaborators', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        Card.populate(res, {
          path: 'lists.cards'
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

/**
 *
 * @param {any} board
 * @returns
 */
boardController.createBoard = function (board) {
  return new Promise((resolve, reject) => {
    const boardToAdd = new Board(board)
    boardToAdd.save((err, item) => {
      if (err) {
        reject(err)
      } else {
        const fakeList = {name: 'List A'}
        const listToAdd = new List(fakeList)
        console.log(listToAdd)
        listToAdd.save((err, item) => {
          if (err) {
            reject(err)
          } else {
            boardController.addListToBoard(boardToAdd._id, listToAdd)
          }
        })
        emit('testID', 'NEW_BOARD', item)
        resolve(item)
      }
    })
  })
}

/**
 *
 * @param {any} board
 * @returns
 */
boardController.importTrelloBoard = function (board) {
  return new Promise((resolve, reject) => {
    const boardToImport = new Board({title: board.name, background: board.prefs.background, owner: board.owner, collaborators: board.collaborators})
    boardToImport.save((err, item) => {
      if (err) {
        reject(err)
      } else {
        board.lists.map((list) => {
          let newList = new List({name: list.name})
          newList.save((err, item) => {
            if (err) {
              reject(err)
            } else {
              boardController.addListToBoard(boardToImport._id, newList)
              board.cards.map((card) => {
                if (card.idList === list.id) {
                  let newCard = new Card({text: card.name, isArchived: card.closed})
                  newCard.save((err, item) => {
                    if (err) {
                      reject(err)
                    } else {
                      listController.addCardToList(newList._id, newCard)
                    }
                  })
                }
              })
            }
          })
        })
        emit('trelloImport', 'IMPORTED_BOARD', item)
        resolve(item)
      }
    })
  })
}
/**
 *
 *
 * @param {any} boardId
 * @param {any} list
 * @returns
 */
boardController.addListToBoard = function (boardId, list) {
  return new Promise((resolve, reject) => {
    Board.findOneAndUpdate({ '_id': boardId }, { $push: { lists: list } }, { new: true }, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

/**
 *
 *
 * @param {any} boardId
 * @param {any} listId
 * @returns
 */
boardController.removeListFromBoard = function (boardId, listId) {
  return new Promise((resolve, reject) => {
    Board.findOneAndUpdate({ '_id': boardId }, { $pull: { 'lists': listId } }, { new: true }, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

/**
 *
 *
 * @param {any} boardId
 * @returns
 */
boardController.getOneboard = function (boardId, userId) {
  return new Promise((resolve, reject) => {
    Board.findOne({ '_id': boardId }).populate('owner lists labels collaborators', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
      if (err) {
        err.status = 500
        reject(err)
      } else {
        let collaborators = res.collaborators
        collaborators = collaborators.filter((x) => (x._id.toString() === userId.toString()))
        if (res.owner._id.toString() !== userId.toString() && res.visibility !== 'public' && collaborators.length === 0) {
          err = new Error('Unauthorize user')
          err.status = 403
          reject(err)
        } else {
          Card.populate(res, {
            path: 'lists.cards'
          }, function (err, res) {
            if (err) {
              err.status = 500
              reject(err)
            } else {
              resolve(res)
            }
          })
        }
      }
    })
  })
}

/**
 *
 * Moves a list in the board
 * @param {any} req
 * @returns The new lists
 */
boardController.moveList = function (req) {
  return new Promise((resolve, reject) => {
    let boardId = req.params.boardId
    let listId = req.params.listId
    let position = req.body.position
    Board.findOne({ '_id': boardId }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        let indexList = res.lists.indexOf(listId)
        let newLists = Util.moveInsideAnArray(res.lists, indexList, position)
        Board.findOneAndUpdate({ '_id': boardId }, { 'lists': newLists }, { new: true }).populate('lists').exec((err, res) => {
          if (err) {
            reject(err)
          }
          Card.populate(res, {
            path: 'lists.cards'
          }, function (err, res) {
            if (err) {
              reject(err)
            } else {
              emit(boardId, 'LIST_MOVED', res.lists)
              resolve(res.lists)
            }
          })
        })
      }
    })
  })
}

boardController.refreshOneboard = function (action, boardId) {
  Board.findOne({ '_id': boardId }).populate('owner lists labels collaborators', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
    if (err) { } else {
      Card.populate(res, {
        path: 'lists.cards'
      }, function (err, res) {
        if (err) { } else {
          emit(boardId, action, res)
        }
      })
    }
  })
}
boardController.addCollaborator = (boardId, userId, requesterId) => {
  return new Promise((resolve, reject) => {
    Board.findOneAndUpdate({ '_id': boardId }, { $push: { collaborators: userId } }, { new: true }).populate('collaborators').exec((err, res) => {
      if (err) {
        err.status = 500
        reject(err)
      } else {
        emit(boardId, 'UPDATE_COLLABORATORS', res.collaborators)
        modificationController.ADDED_COLLABORATOR_BOARD(boardId, requesterId, userId).catch((err) => {
          reject(err)
        })
        resolve(res)
      }
    })
  })
}

boardController.addCollaboratorEmail = (boardId, email, requesterId) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email }).then((res) => {
      if (res) {
        boardController.addCollaborator(boardId, res._id, requesterId).then(res => {
          resolve(res)
        }).catch(err => {
          err.status = 500
          reject(err)
        })
      } else {
        // TODO create new temp user??
        let err = new Error('Not found')
        reject(err)
      }
    })
  })
}

boardController.removeCollaborator = (boardId, userId, requesterId) => {
  return new Promise((resolve, reject) => {
    Board.findOne({ '_id': boardId }).populate('lists').exec((err, res) => {
      if (err) {
        err.status = 500
        reject(err)
      } else {
        Card.populate(res, {
          path: 'lists.cards'
        }, function (err, res) {
          if (err) {
            reject(err)
          } else {
            let cards = []
            res.lists.map((list) => list.cards.map((card) => {
              card.collaborators.map((collaborator) => {
                if (collaborator.toString() === userId.toString()) {
                  Card.findOneAndUpdate({'_id': card._id}, {$pull: {collaborators: userId}}).exec()
                }
              })
              if (card.responsible !== null && card.responsible !== undefined) {
                if (card.responsible.toString() === userId.toString()) {
                  Card.findOneAndUpdate({'_id': card._id}, {responsible: null}).exec()
                }
              }
            }))
            resolve(cards)
          }
        })
      }
    })
    Board.findOneAndUpdate({ '_id': boardId }, { $pull: { collaborators: userId } }, { new: true }).populate('collaborators').exec((err, res) => {
      if (err) {
        err.status = 500
        reject(err)
      } else {
        boardController.refreshOneboard('COLLABORATOR_REMOVED', boardId)
        emit(boardId, 'UPDATE_COLLABORATORS', res.collaborators)
        modificationController.REMOVED_COLLABORATOR_BOARD(boardId, requesterId, userId).catch((err) => {
          reject(err)
        })
        resolve(res)
      }
    })
  })
}

boardController.addCollaborators = (board, users) => {

}
boardController.getBoardHistory = (boardId, limit, skip) => {
  return new Promise((resolve, reject) => {
    Modification.find({'board': boardId}).populate('user fromList toList targetUser card comment list', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).sort({timestamp: 'desc'}).exec((err, items) => {
      if (err) {
        err.status = 500
        console.log(err)
        reject(err)
      }
      resolve(items)
    })
  })
}
boardController.createLabel = (req) => {
  return new Promise((resolve, reject) => {
    let labelToAdd = {name: req.body.name, color: req.body.color}
    const labelObject = new Label(labelToAdd)
    labelObject.save((err, label) => {
      if (err) {
        reject(err)
      }
      Board.findOneAndUpdate({ '_id': req.params.boardId }, {$push: {'labels': label._id}}, { new: true }).populate('labels').exec(function (err, res) {
        if (err) {
          reject(err)
        } else {
          emit(req.params.boardId, 'LABEL_CREATED', res.labels)
          resolve(res.labels)
        }
      })
    })
  })
}
boardController.updateLabel = (req) => {
  return new Promise((resolve, reject) => {
    Label.findOneAndUpdate({'_id': req.params.labelId}, req.body).exec(function (err, result) {
      if (err) {
        reject(err)
      } else {
        Board.findOne({'_id': req.params.boardId}).populate('labels').exec(function (err, res) {
          if (err) {
            reject(err)
          } else {
            emit(req.params.boardId, 'LABEL_UPDATED', res.labels)
            resolve(res.labels)
          }
        })
      }
    })
  })
}
boardController.removeLabel = (boardId, labelId) => {
  return new Promise((resolve, reject) => {
    Card.find({'labels': labelId}).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        res.map((card) => {
          Card.findOneAndUpdate({'_id': card._id}, {$pull: {'labels': labelId}}).exec()
        })
        Board.findOneAndUpdate({'_id': boardId}, {$pull: {'labels': labelId}}, { new: true }).populate('labels').exec(function (err, res) {
          if (err) {
            reject(err)
          } else {
            Label.findOneAndRemove({'_id': labelId}).exec(function (err, result) {
              if (err) {
                reject(err)
              } else {
                emit(boardId, 'LABEL_REMOVED', res.labels)
                resolve(res.labels)
              }
            })
          }
        })
      }
    })
  })
}
module.exports = boardController
