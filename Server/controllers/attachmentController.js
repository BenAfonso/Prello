// const mongoose = require('mongoose')
// const Board = mongoose.model('Board')
// const Card = mongoose.model('Card')
// const Attachment = mongoose.model('Attachment')
const FileUploader = require('../services/fileStorage')
const attachmentController = {}

attachmentController.getBoardAttachments = function () {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

attachmentController.getCardAttachments = function () {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

attachmentController.createAttachment = function (userId, file) {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

attachmentController.deleteAttachment = function (userId, file) {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

attachmentController.updateAttachment = function (boardId, userId, fileName, file) {
  return new Promise((resolve, reject) => {
    const attachmentId = '' // Previously created attachmentId
    FileUploader.uploadFile(boardId, attachmentId, file).then(res => {
      resolve(true)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = attachmentController
