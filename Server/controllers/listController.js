const mongoose = require('mongoose')
const List = mongoose.model('List')
const boardController = require('./boardController')
const modificationController = require('./modificationController')
const listController = {}
const emit = require('../controllers/sockets').emit
listController.createList = (req) => {
  return new Promise((resolve, reject) => {
    const listToAdd = new List(req.body)
    listToAdd.save((err, item) => {
      if (err) {
        reject(err)
      } else {
        boardController.addListToBoard(req.params.boardId, listToAdd)
            .then((data) => {
              emit(req.params.boardId, 'NEW_LIST', item)
              resolve(item)
            })
            .catch((err) => {
              reject(err)
            })
      }
    })
  })
}

listController.createListByBoardId = (boardId, name) => {
  return new Promise((resolve, reject) => {
    const listToAdd = new List({name})
    listToAdd.save((err, item) => {
      if (err) {
        reject(err)
      } else {
        boardController.addListToBoard(boardId, listToAdd)
            .then((data) => {
              resolve(item)
            })
            .catch((err) => {
              reject(err)
            })
      }
    })
  })
}

listController.createScrumLists = (boardId) => { // <- NOT SURE ABOUT THE CODE QUALITY
  return new Promise((resolve, reject) => {
    listController.createListByBoardId(boardId, 'Product Backlog').then(data => {
      listController.createListByBoardId(boardId, 'Sprint Planning').then(data => {
        listController.createListByBoardId(boardId, 'TO DO').then(data => {
          listController.createListByBoardId(boardId, 'WIP').then(data => {
            listController.createListByBoardId(boardId, 'Review').then(data => {
              listController.createListByBoardId(boardId, 'Sprint 1').then(data => {
                resolve(data)
              }).catch(err => {
                reject(err)
              })
            }).catch(err => {
              reject(err)
            })
          }).catch(err => {
            reject(err)
          })
        }).catch(err => {
          reject(err)
        })
      }).catch(err => {
        reject(err)
      })
    }).catch(err => {
      reject(err)
    })
  })
}

listController.createKanbanLists = (boardId) => {
  return new Promise((resolve, reject) => {
    listController.createListByBoardId(boardId, 'Backlog')
    .then(data => {
      listController.createListByBoardId(boardId, 'Ready')
      .then(data => {
        listController.createListByBoardId(boardId, 'Coding')
        .then(data => {
          listController.createListByBoardId(boardId, 'Testing')
          .then(data => {
            listController.createListByBoardId(boardId, 'Approval')
            .then(data => {
              listController.createListByBoardId(boardId, 'Done')
              .then(data => {
                resolve(data)
              }).catch(err => {
                reject(err)
              })
            }).catch(err => {
              reject(err)
            })
          }).catch(err => {
            reject(err)
          })
        }).catch(err => {
          reject(err)
        })
      }).catch(err => {
        reject(err)
      })
    }).catch(err => {
      reject(err)
    })
  })
}

listController.removeList = (boardId, listId) => {
  return new Promise((resolve, reject) => {
    List.findOneAndRemove({ '_id': listId }, (err, item) => {
      if (err) {
        reject(err)
      } else {
        boardController.removeListFromBoard(boardId, listId)
          .then((data) => {
            emit(boardId, 'REMOVE_LIST', item)
            resolve(item)
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  })
}
listController.updateList = (req) => {
  return new Promise((resolve, reject) => {
    List.findOneAndUpdate({ '_id': req.params.listId }, req.body, {new: true}, (err, item) => {
      if (err) {
        return reject(err)
      } else {
        if (req.body.isArchived && (!item.isArchived || item.isArchived === undefined)) {
          modificationController.ARCHIVED_LIST(req.params.boardId, req.user._id, req.params.listId).catch((err) => {
            reject(err)
          })
        }
        if (!req.body.isArchived && item.isArchived) {
          modificationController.UNARCHIVED_LIST(req.params.boardId, req.user._id, req.params.listId).catch((err) => {
            reject(err)
          })
        }
        boardController.refreshOneboard('LIST_UPDATED', req.params.boardId)
        // TODO: Log update to history
        return resolve(item)
      }
    })
  })
}
listController.addCardToList = function (listId, card) {
  return new Promise((resolve, reject) => {
    List.findOneAndUpdate({'_id': listId}, {$push: {cards: card}}, {new: true}, function (err, res) {
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
listController.removeCardFromList = function (listId, cardId) {
  return new Promise((resolve, reject) => {
    List.findOneAndUpdate({ '_id': listId }, { $pull: { 'cards': cardId } }, { new: true }, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
module.exports = listController
