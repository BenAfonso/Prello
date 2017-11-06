const {requiresLogin} = require('../../config/middlewares/authorization')
const {cardExists} = require('../../config/middlewares/cardAuthorizations')
const {listExists, hasCardInside} = require('../../config/middlewares/listAuthorizations')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
  router.delete('/boards/:boardId/lists/:listId/cards/:cardId/comments/:commentId/attachments/:attachmentId', [requiresLogin, cardExists, listExists, hasCardInside, isCollaborator], (req, res) => {
    controller.deleteAttachment(req).then(result => {
      res.status(200).send('Attachment removed')
    }).catch(err => {
      res.status(500).send(err)
    })
  })
}
