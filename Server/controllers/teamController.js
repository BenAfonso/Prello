const mongoose = require('mongoose')
const Team = mongoose.model('Team')
const User = mongoose.model('User')
const Board = mongoose.model('Board')

const teamController = {}
/**
 *
 * @param {String} name
 * @param {ObjectId} userId
 * @returns
 */
teamController.createTeam = function (name, userId) {
  return new Promise((resolve, reject) => {
    const teamToAdd = new Team({name: name, admins: [userId], users: [userId]})
    teamToAdd.save((err, item) => {
      if (err) {
        reject(err)
      } else {
        resolve(item)
      }
    })
  })
}

/**
 *
 * @param {ObjectId} teamId
 * @param {ObjectId} userId
 * @returns
 */
teamController.addCollaboratorToTeam = function (teamId, userId) {
  return new Promise((resolve, reject) => {
    Team.findOneAndUpdate({ '_id': teamId }, { $push: { users: userId } }, { new: true }).populate('boards admins users').exec((err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
teamController.addCollaboratorEmail = (teamId, email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email }).then((res) => {
      if (res) {
        teamController.addCollaboratorToTeam(teamId, res._id).then(res => {
          resolve(res)
        }).catch(err => {
          err.status = 500
          reject(err)
        })
      } else {
        // TODO create new temp user??
        let err = new Error('Not found')
        err.status = 404
        reject(err)
      }
    })
  })
}
/**
 *
 * @param {ObjectId} teamId
 * @param {ObjectId} userId
 * @returns
 */
teamController.removeCollaboratorFromTeam = function (teamId, userId) {
  return new Promise((resolve, reject) => {
    Team.findOneAndUpdate({ '_id': teamId }, { $pull: { users: userId } }, { new: true }, function (err, res) {
      if (err) {
        reject(err)
      } else {
        console.log(res)
        resolve(res)
      }
    })
  })
}
teamController.updateTeam = function (teamId, body) {
  return new Promise((resolve, reject) => {
    console.log(body)
    delete body.users
    delete body.createdAt
    Team.findOneAndUpdate({ '_id': teamId }, { name: body.name, visibility: body.visibility, picture: body.picture }, { new: true }, function (err, res) {
      console.log(res)
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
teamController.getOneTeam = function (teamId) {
  return new Promise((resolve, reject) => {
    Team.findOne({ '_id': teamId }).populate('boards users admins', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        teamController.getBoardsTeam(teamId).then((result) => {
          let teamToSend = res._doc
          teamToSend.boards = result
          resolve(teamToSend)
        }).catch((err) => {
          reject(err)
        })
      }
    })
  })
}
teamController.getBoardsTeam = function (teamId) {
  return new Promise((resolve, reject) => {
    Board.find({ 'teams': teamId }).populate('lists users admins', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
teamController.setAdmin = function (teamId, userId) {
  return new Promise((resolve, reject) => {
    Team.findOneAndUpdate({ '_id': teamId }, { $push: { admins: userId } }, { new: true }).populate('boards admins users').exec((err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
teamController.unsetAdmin = function (teamId, userId) {
  return new Promise((resolve, reject) => {
    Team.findOneAndUpdate({ '_id': teamId }, { $pull: { admins: userId } }, { new: true }).populate('boards admins users').exec((err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
teamController.removeAdmin = function (teamId, userId) {
  return new Promise((resolve, reject) => {
    Team.findOneAndUpdate({ '_id': teamId }, { $pull: { admins: userId } }, { new: true }).populate('boards admins users').exec((err, res) => {
      if (err) {
        reject(err)
      } else {
        teamController.removeCollaboratorFromTeam(teamId, userId).then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      }
    })
  })
}
module.exports = teamController
