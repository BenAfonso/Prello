const {requiresLogin} = require('../../config/middlewares/authorization')
const {cardExists} = require('../../config/middlewares/cardAuthorizations')
const {listExists, hasCardInside} = require('../../config/middlewares/listAuthorizations')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
    /**
    * @swagger
    * /boards/{boardId}/lists/{listId}/cards/{cardId}/attachments/{attachmentId}:
    *   delete:
    *     tags:
    *       - Attachments
    *     description: Remove an attachment inside a card
    *     summary: Remove an attachment inside a card
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where where the attachment is
    *         in: path
    *         required: true
    *       - name: listId
    *         type: string
    *         description: The list id where the attachment is
    *         in: path
    *         required: true
    *       - name: cardId
    *         type: string
    *         description: The card id where the attachment is
    *         in: path
    *         required: true
    *       - name: attachmentId
    *         type: string
    *         description: The attachmentId we want to remove
    *         in: path
    *         required: true
    *     responses:
    *       200:
    *         description: Message confirming the attachment has been removed
    *       500:
    *         description: Internal error
    */
  router.delete('/boards/:boardId/lists/:listId/cards/:cardId/attachments/:attachmentId', [requiresLogin, cardExists, listExists, hasCardInside, isCollaborator], (req, res) => {
    controller.deleteAttachment(req).then(result => {
      res.status(200).send('Attachment removed')
    }).catch(err => {
      res.status(500).send(err)
    })
  })
}
