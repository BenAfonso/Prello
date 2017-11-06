const {requiresLogin} = require('../../config/middlewares/authorization')
const {cardExists} = require('../../config/middlewares/cardAuthorizations')
const {listExists, hasCardInside} = require('../../config/middlewares/listAuthorizations')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')
const multer = require('multer')
const multerUpload = multer().any()
module.exports = (router, controller) => {
  router.post('/boards/:boardId/lists/:listId/cards/:cardId/attachments', [requiresLogin, cardExists, listExists, hasCardInside, isCollaborator, (req, res) => {
    multerUpload(req, res, function (err) {
      if (err) {
        return res.status(500).send('Error: an error occured while uploading').end()
      }
      if (!req.files && !req.file) {
        return res.status(400).send('Error: expect files to upload').end()
      }
      controller.createAttachment(req).then(result => {
        return res.status(201).send(result)
      }).catch(err => {
        return res.status(500).send(err)
      })
    })
  }])
}
