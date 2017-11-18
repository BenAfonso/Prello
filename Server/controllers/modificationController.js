const mongoose = require('mongoose')
const Modification = mongoose.model('Modification')
const modificationController = {}

modificationController.MOVED_CARD = (boardId, userId, cardId, fromListId, toListId) => {
  return new Promise((resolve, reject) => {
    if (fromListId !== toListId) {
      let modificationToAdd = Modification({type: 'MOVED_CARD', board: boardId, user: userId, card: cardId, fromList: fromListId, toList: toListId})
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

modificationController.SET_RESPONSABLE = (boardId, userId, cardId, targetUserID) => {
  return new Promise((resolve, reject) => {
    let modificationToAdd = Modification({type: 'SET_RESPONSABLE', board: boardId, user: userId, card: cardId, targetUser: targetUserID})
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
modificationController.CREATED_CARD = (boardId, userId, cardId, listId) => {
  return new Promise((resolve, reject) => {
    let modificationToAdd = Modification({type: 'CREATED_CARD', board: boardId, user: userId, card: cardId, list: listId})
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
modificationController.UNARCHIVED_LIST = (boardId, userId, listId) => {
  return new Promise((resolve, reject) => {
    let modificationToAdd = Modification({type: 'UNARCHIVED_LIST', board: boardId, user: userId, list: listId})
    modificationToAdd.save((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

modificationController.UNARCHIVED_CARD = (boardId, userId, cardId) => {
  return new Promise((resolve, reject) => {
    let modificationToAdd = Modification({type: 'UNARCHIVED_CARD', board: boardId, user: userId, card: cardId})
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
    let modificationToAdd = Modification({type: 'ADDED_DUE_DATE', board: boardId, user: userId, card: cardId, dueDate: dueDate})
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
    let modificationToAdd = Modification({type: 'MARKED_DUE_DATE_COMPLETE', board: boardId, user: userId, card: cardId})
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
    let modificationToAdd = Modification({type: 'MARKED_DUE_DATE_INCOMPLETE', board: boardId, user: userId, card: cardId})
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
modificationController.findCardHistory = (cardId) => {
  return new Promise((resolve, reject) => {
    Modification.find({'card': cardId}).populate('user fromList toList targetUser comment list', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).sort({timestamp: 'desc'}).exec((err, items) => {
      if (err) {
        reject(err)
      }
      resolve(items)
    })
  })
}

modificationController.findUserHistory = (userId, limit, skip) => {
  return new Promise((resolve, reject) => {
    let populateBoardTeams = {path: 'board', populate: {path: 'teams', model: 'Team'}}
    let populateBoardOwner = {path: 'board', populate: {path: 'owner', model: 'User'}}
    let populateQueryBoardCollabs = {path: 'board', populate: {path: 'collaborators', model: 'User'}}
    let populateUsersTeam = {path: 'board', populate: {path: 'teams', populate: {path: 'users', model: 'User'}}}
    let populateAdminsTeam = {path: 'board', populate: {path: 'teams', populate: {path: 'admins', model: 'User'}}}
    Modification.find({'user': userId}).limit(limit).skip(skip).populate('fromList toList targetUser comment list board user card', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 })
    .populate(populateBoardTeams)
    .populate(populateBoardOwner)
    .populate(populateQueryBoardCollabs)
    .populate(populateUsersTeam)
    .populate(populateAdminsTeam).sort({timestamp: 'desc'}).exec((err, items) => {
      if (err) {
        reject(err)
      }
      resolve(items)
    })
  })
}

module.exports = modificationController
