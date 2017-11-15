const mongoose = require('mongoose')
const Board = mongoose.model('Board')
const Comment = mongoose.model('Comment')
const Card = mongoose.model('Card')
const Attachment = mongoose.model('Attachment')
const FileUploader = require('../services/fileStorage')
const attachmentController = {}

attachmentController.getBoardAttachments = function (req) {
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}

attachmentController.getFile = (req, res) => {
  return new Promise((resolve, reject) => {
    FileUploader.getFile(res, req.params.boardId, req.params.attachmentId).then(result => {
      // Handled in service
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
      let file = req.files[0]
      let name = ''
      if (req.body.name !== undefined) {
        name = req.body.name
      } else {
        name = file.originalname
      }
      const ext = file.originalname.split('.')[file.originalname.split('.').length - 1]
      const attachmentToAdd = new Attachment({name: name, owner: req.user._id, ext: ext})
      attachmentToAdd.save((err, item) => {
        if (err) {
          reject(err)
        } else {
          FileUploader.uploadFile(req.params.boardId, item._id, file).then(result => {
            if (req.params.commentId !== undefined) {
              Comment.findOneAndUpdate({'_id': req.params.commentId}, {$push: {attachments: item._id}}).exec()
            }
            if (req.params.cardId !== undefined) {
              Card.findOneAndUpdate({'_id': req.params.cardId}, {$push: {attachments: item._id}}).exec()
            }
            Board.findOneAndUpdate({'_id': req.params.boardId}, {$push: {attachments: item._id}}).exec()
            resolve(item)
          }).catch(err => {
            Attachment.findOneAndRemove({'_id': item._id}).exec()
            reject(err)
          })
        }
      })
    } else {
      // TODO: File missing -> 400 Bad Request
      reject(new Error('Missing file'))
    }
  })
}

attachmentController.deleteAttachment = function (req) {
  return new Promise((resolve, reject) => {
    Attachment.findOne({'_id': req.params.attachmentId}).exec().then(file => {
      FileUploader.removeFile(req.params.boardId, req.params.attachmentId, file.ext).then(result => {
        if (req.params.commentId !== undefined) {
          Comment.findOneAndUpdate({'_id': req.params.commentId}, {$pull: {attachments: req.params.attachmentId}}).exec()
        }
        if (req.params.cardId !== undefined) {
          Card.findOneAndUpdate({'_id': req.params.cardId}, {$pull: {attachments: req.params.attachmentId}}).exec()
        }
        Board.findOneAndUpdate({'_id': req.params.boardId}, {$pull: {attachments: req.params.attachmentId}}).exec()
        Attachment.findOneAndRemove({'_id': req.params.attachmentId}).exec()
        resolve(result)
      }).catch(err => reject(err))
    }).catch(err => reject(err))
  })
}

attachmentController.updateAttachment = function (boardId, fileId, fileName) {
  return new Promise((resolve, reject) => {
    Attachment.update({ '_id': fileId }, {name: fileName}, {new: true}).exec((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = attachmentController
