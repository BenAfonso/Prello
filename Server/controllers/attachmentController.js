// const mongoose = require('mongoose')
// const Board = mongoose.model('Board')
// const Card = mongoose.model('Card')
// const Attachment = mongoose.model('Attachment')
const FileUploader = require('../services/fileStorage')
const attachmentController = {}

attachmentController.getBoardAttachments = function (req) {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

attachmentController.getFile = (req) => {
  return new Promise((resolve, reject) => {
    FileUploader.getFile(req.params.boardId, req.params.attachmentId).then(result => {
      resolve(result)
    }).catch(err => reject(err))
  })
}

attachmentController.getCardAttachments = function () {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

attachmentController.createAttachment = function (req) {
  return new Promise((resolve, reject) => {
    if (req.files) {
      var file = req.files[0]
      FileUploader.uploadFile(req.params.boardId, Math.floor(Math.random() * 1000000000), file).then(result => {
        resolve(result)
      }).catch(err => reject(err))
    } else {
      // TODO: File missing -> 400 Bad Request
      reject(new Error('Missing file'))
    }
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
