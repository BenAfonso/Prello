// const mongoose = require('mongoose')
// const Modification = mongoose.model('Modification')

const modificationController = {}

modificationController.MOVED_CARD = (user, fromList, toList) => {
  return new Promise((resolve, reject) => {
    if (fromList._id === toList._id) {
      return reject(new Error('Same lists'))
    }
    resolve(true)
  })
}

modificationController.ADDED_COLLABORATOR_BOARD = (user, targetUser) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.REMOVED_COLLABORATOR_BOARD = (user, targetUser) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.SET_RESPONSABLE = (user, responsable) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.JOINED_RESPONSABLE = (user) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.ADDED_USER_CARD = (user, card, targetUser) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.REMOVED_USER_CARD = (user, card, targetUser) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.JOINED_CARD = (user, card) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.LEFT_CARD = (user, card) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.ADDED_COMMENT = (user, card, comment) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.ADDED_ATTACHMENT = (user, card, attachment) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.ARCHIVED_LIST = (user, list) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.ARCHIVED_CARD = (user, card) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.ADDED_DUE_DATE = (user, card, dueDate) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.MARKED_DUE_DATE_COMPLETE = (user, card) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

modificationController.MARKED_DUE_DATE_INCOMPLETE = (user, card) => {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

module.exports = modificationController
