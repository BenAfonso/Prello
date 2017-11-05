// const mongoose = require('mongoose')
// const Modification = mongoose.model('Modification')

const modificationController = {}

modificationController.MOVED_CARD = (boardId, user, fromList, toList) => {
  return new Promise((resolve, reject) => {
    if (fromList._id === toList._id) {
      return reject(new Error('Same lists'))
    }
    resolve(true)
  })
}

modificationController.ADDED_COLLABORATOR_BOARD = (boardId, user, targetUser) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.REMOVED_COLLABORATOR_BOARD = (boardId, user, targetUser) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.SET_RESPONSABLE = (boardId, user, card, responsable) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.JOINED_RESPONSABLE = (boardId, user, card) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.ADDED_USER_CARD = (boardId, user, card, targetUser) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.REMOVED_USER_CARD = (boardId, user, card, targetUser) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.JOINED_CARD = (boardId, user, card) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.LEFT_CARD = (boardId, user, card) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.ADDED_COMMENT = (boardId, user, card, comment) => {
  return new Promise((resolve, reject) => {
    console.log(`USER ${user} COMMENTED ${comment} ON CARD ${card}.`)
    resolve(true)
  })
}

modificationController.ADDED_ATTACHMENT = (boardId, user, card, attachment) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.ARCHIVED_LIST = (boardId, user, list) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.ARCHIVED_CARD = (boardId, user, card) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.ADDED_DUE_DATE = (boardId, user, card, dueDate) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.MARKED_DUE_DATE_COMPLETE = (boardId, user, card) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.MARKED_DUE_DATE_INCOMPLETE = (boardId, user, card) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

module.exports = modificationController
