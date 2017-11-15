const mongoose = require('mongoose')
const Board = mongoose.model('Board')
const User = mongoose.model('User')
const Team = mongoose.model('Team')
const Label = mongoose.model('Label')
const Modification = mongoose.model('Modification')
const List = mongoose.model('List')
const Card = mongoose.model('Card')
const Checklist = mongoose.model('Checklist')
const Util = require('./Util')
const emit = require('../controllers/sockets').emit
const modificationController = require('./modificationController')
// const listController = require('./listController')
// const cardController = require('./cardController')
const boardController = {}

/**
 *
 *
 * @returns
 */
boardController.getAllBoards = function () {
  return new Promise((resolve, reject) => {
    Board.find().populate('owner lists labels collaborators teams attachments', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
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
    Team.find({ 'users': userId }).then((teams) => {
      Board.find({$or: [{ 'owner': userId }, { 'collaborators': userId }, {'teams': {$in: teams}}]}).populate('owner lists collaborators labels teams', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
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
          User.populate(res, {
            path: 'teams.users'
          }, function (err, res) {
            if (err) {
              err.status = 500
              reject(err)
            } else {
              resolve(res)
            }
          })
        }
      })
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
        if (item.teams !== undefined) {
          item.teams.map((team) => {
            Team.findOneAndUpdate({'_id': team}, {$push: {boards: item._id}}).exec()
          })
        }
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
        let tempLabels = []
        board.labels.map((label) => {
          let newLabel = new Label({name: label.name, color: label.color})
          newLabel.save((err, item) => {
            if (err) {
              reject(err)
            } else {
              tempLabels.push({id: label.id, mongoId: newLabel._id})
              boardController.addLabelToBoard(boardToImport._id, newLabel)
            }
          })
        })
        const sortedLists = board.lists.sort((l1, l2) => {
          if (l1.pos < l2.pos) return -1
          else if (l1.pos > l2.pos) return 1
          else return 0
        })
        sortedLists.map((list, index) => {
          let newList = new List({name: list.name, isArchived: list.closed, position: index + 1})
          newList.save((err, item) => {
            if (err) {
              reject(err)
            } else {
              boardController.addListToBoard(boardToImport._id, newList)
              board.cards.map((card) => {
                if (card.idList === list.id) {
                  let newCard
                  if (card.due === null) {
                    newCard = new Card({text: card.name, isArchived: card.closed, description: card.desc})
                  } else {
                    newCard = new Card({text: card.name, isArchived: card.closed, dueDate: card.due, description: card.desc, validated: card.dueComplete})
                  }
                  newCard.save((err, item) => {
                    if (err) {
                      reject(err)
                    } else {
                      List.findOneAndUpdate({'_id': newList._id}, {$push: {cards: newCard}}).exec()
                      card.labels.map((cardLabel) => {
                        tempLabels.map((tempLabel) => {
                          if (cardLabel.id === tempLabel.id) {
                            Card.findOneAndUpdate({ '_id': newCard._id }, { $push: { labels: tempLabel.mongoId } }, { new: true }).exec()
                          }
                        })
                      })
                      board.checklists.map((checklist) => {
                        if (card.id === checklist.idCard) {
                          let newChecklist = new Checklist({text: checklist.name, items: []})
                          checklist.checkItems.map((item) => {
                            let checked = item.state === 'complete'
                            newChecklist.items.push({text: item.name, isChecked: checked})
                          })
                          newChecklist.save((err, item) => {
                            if (err) {
                              reject(err)
                            } else {
                              Card.findOneAndUpdate({ '_id': newCard._id }, { $push: { checklists: newChecklist } }).exec()
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        })
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
 * @param {any} boardId
 * @param {any} label
 * @returns
 */
boardController.addLabelToBoard = function (boardId, label) {
  return new Promise((resolve, reject) => {
    Board.findOneAndUpdate({ '_id': boardId }, { $push: { labels: label } }, { new: true }, function (err, res) {
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
    Board.findOne({ '_id': boardId }).populate('owner lists labels collaborators teams attachments', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
      if (err) {
        err.status = 500
        reject(err)
      } else {
        Card.populate(res, {
          path: 'lists.cards'
        }, function (err, res) {
          if (err) {
            err.status = 500
            reject(err)
          } else {
            User.populate(res, {
              path: 'attachments.owner',
              select: { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }
            }, function (err, res) {
              if (err) {
                err.status = 500
                reject(err)
              } else {
                User.populate(res, {
                  path: 'teams.users',
                  select: { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }
                }, function (err, res) {
                  if (err) {
                    err.status = 500
                    reject(err)
                  } else {
                    resolve(res)
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
    console.log(position)
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
  Board.findOne({ '_id': boardId }).populate('owner lists labels collaborators attachments', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
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

boardController.addTeam = (boardId, teamId) => {
  return new Promise((resolve, reject) => {
    Board.findOneAndUpdate({ '_id': boardId }, { $push: { teams: teamId } }, { new: true }).populate('teams').exec((err, res) => {
      if (err) {
        err.status = 500
        reject(err)
      } else {
        Team.findOneAndUpdate({ '_id': teamId }, { $push: { boards: boardId } }, { new: true }).exec()
        User.populate(res, {
          path: 'teams.users'
        }, function (err, res) {
          if (err) {
            err.status = 500
            reject(err)
          } else {
            emit(boardId, 'UPDATE_TEAMS', res.teams)
            resolve(res)
          }
        })
      }
    })
  })
}
boardController.removeTeam = (boardId, teamId) => {
  return new Promise((resolve, reject) => {
    Board.findOneAndUpdate({ '_id': boardId }, { $pull: { teams: teamId } }, { new: true }).populate('teams').exec((err, res) => {
      if (err) {
        err.status = 500
        reject(err)
      } else {
        Team.findOneAndUpdate({ '_id': teamId }, { $pull: { boards: boardId } }, { new: true }).exec()
        User.populate(res, {
          path: 'teams.users'
        }, function (err, res) {
          if (err) {
            err.status = 500
            reject(err)
          } else {
            emit(boardId, 'UPDATE_TEAMS', res.teams)
            resolve(res)
          }
        })
      }
    })
  })
}

boardController.addCollaborators = (board, users) => {

}
boardController.getBoardHistory = (boardId, limit, skip) => {
  return new Promise((resolve, reject) => {
    Modification.find({'board': boardId}).limit(limit).skip(skip).populate('user fromList toList targetUser card comment list', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).sort({timestamp: 'desc'}).exec((err, items) => {
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
