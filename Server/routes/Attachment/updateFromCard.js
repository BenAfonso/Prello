const {requiresLogin} = require('../../config/middlewares/authorization')
const {cardExists} = require('../../config/middlewares/cardAuthorizations')
const {listExists, hasCardInside} = require('../../config/middlewares/listAuthorizations')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
  router.put('/boards/:boardId/lists/:listId/cards/:cardId/attachments', [requiresLogin, cardExists, listExists, hasCardInside, isCollaborator], (req, res) => {
    if (req.body.name === undefined) {
      res.status(400).send('Missing name')
    }
    controller.updateAttachment(req.params.boardId, req.params.attachmentId, req.body.name).then(result => {
      res.status(200).send(result)
    }).catch(err => {
      res.status(500).send(err)
    })
  })
}
