const mongoose = require('mongoose')
const Team = mongoose.model('Team')
const User = mongoose.model('User')

const teamController = {}
/**
 *
 * @param {String} name
 * @param {ObjectId} userId
 * @returns
 */
teamController.createTeam = function (name, userId) {
  return new Promise((resolve, reject) => {
    const teamToAdd = new Team({name: name, users: [userId]})
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
    Team.findOneAndUpdate({ '_id': teamId }, { $push: { collaborators: userId } }, { new: true }, function (err, res) {
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
    Team.findOneAndUpdate({ '_id': teamId }, { $pull: { collaborators: userId } }, { new: true }, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
teamController.updateTeam = function (teamId, body) {
  return new Promise((resolve, reject) => {
    delete body.users
    delete body.createdAt
    Team.findOneAndUpdate({ '_id': teamId }, { body }, { new: true }, function (err, res) {
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
    Team.findOne({ '_id': teamId }).populate('boards users', { 'passwordHash': 0, 'salt': 0, 'provider': 0, 'enabled': 0, 'authToken': 0 }).exec(function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
module.exports = teamController
