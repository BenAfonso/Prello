const mongoose = require('mongoose')
const Modification = mongoose.model('Modification')

const modificationController = {}

modificationController.MOVED_CARD = (boardId, userId, fromListId, toListId) => {
  return new Promise((resolve, reject) => {
    if (fromListId !== toListId) {
      let modificationToAdd = Modification({type: 'MOVED_CARD', board: boardId, user: userId, fromList: fromListId, toList: toListId})
      modificationToAdd.save((err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    }
    reject(new Error('Same list'))
  })
}

modificationController.ADDED_COLLABORATOR_BOARD = (boardId, userId, targetUserID) => {
  return new Promise((resolve, reject) => {
    let modificationToAdd = Modification({type: 'ADDED_COLLABORATOR_BOARD', board: boardId, user: userId, targetUser: targetUserID})
    modificationToAdd.save((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

modificationController.REMOVED_COLLABORATOR_BOARD = (boardId, userId, targetUserID) => {
  return new Promise((resolve, reject) => {
    let modificationToAdd = Modification({type: 'REMOVED_COLLABORATOR_BOARD', board: boardId, user: userId, targetUser: targetUserID})
    modificationToAdd.save((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

modificationController.SET_RESPONSABLE = (boardId, userId, cardId, responsableId) => {
  return new Promise((resolve, reject) => {
    let modificationToAdd = Modification({type: 'SET_RESPONSABLE', board: boardId, user: userId, card: cardId, responsable: responsableId})
    modificationToAdd.save((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

modificationController.ADDED_USER_CARD = (boardId, userId, cardId, targetUserID) => {
  return new Promise((resolve, reject) => {
    let modificationToAdd = Modification({type: 'ADDED_USER_CARD', board: boardId, user: userId, card: cardId, targetUser: targetUserID})
    modificationToAdd.save((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

modificationController.REMOVED_USER_CARD = (boardId, userId, cardId, targetUserID) => {
  return new Promise((resolve, reject) => {
    let modificationToAdd = Modification({type: 'REMOVED_USER_CARD', board: boardId, user: userId, card: cardId, targetUser: targetUserID})
    modificationToAdd.save((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

modificationController.ADDED_COMMENT = (boardId, userId, cardId, commentId) => {
  return new Promise((resolve, reject) => {
    let modificationToAdd = Modification({type: 'ADDED_COMMENT', board: boardId, user: userId, card: cardId, comment: commentId})
    modificationToAdd.save((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

modificationController.ADDED_ATTACHMENT = (boardId, userId, cardId, attachmentId) => {
  return new Promise((resolve, reject) => {
    let modificationToAdd = Modification({type: 'ADDED_ATTACHMENT', board: boardId, user: userId, card: cardId, attachment: attachmentId})
    modificationToAdd.save((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

modificationController.ARCHIVED_LIST = (boardId, userId, listId) => {
  return new Promise((resolve, reject) => {
    let modificationToAdd = Modification({type: 'ARCHIVED_LIST', board: boardId, user: userId, list: listId})
    modificationToAdd.save((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

modificationController.ARCHIVED_CARD = (boardId, userId, cardId) => {
  return new Promise((resolve, reject) => {
    let modificationToAdd = Modification({type: 'ARCHIVED_CARD', board: boardId, user: userId, card: cardId})
    modificationToAdd.save((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

modificationController.ADDED_DUE_DATE = (boardId, userId, cardId, dueDate) => {
  return new Promise((resolve, reject) => {
    let modificationToAdd = Modification({type: 'ADDED_DUE_DATE', board: boardId, user: userId, dueDate: dueDate})
    modificationToAdd.save((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

modificationController.MARKED_DUE_DATE_COMPLETE = (boardId, userId, cardId) => {
  return new Promise((resolve, reject) => {
    let modificationToAdd = Modification({type: 'MARKED_DUE_DATE_COMPLETE', board: boardId, user: userId})
    modificationToAdd.save((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

modificationController.MARKED_DUE_DATE_INCOMPLETE = (boardId, userId, cardId) => {
  return new Promise((resolve, reject) => {
    let modificationToAdd = Modification({type: 'MARKED_DUE_DATE_INCOMPLETE', board: boardId, user: userId})
    modificationToAdd.save((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

modificationController.findBoardHistory = (boardId) => {
  return new Promise((resolve, reject) => {
    Modification.find({'board': boardId}).populate('user fromList toList targetUser card comment list', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).sort({timestamp: 'desc'}).exec((err, items) => {
      if (err) {
        reject(err)
      }
      resolve(items)
    })
  })
}

module.exports = modificationController