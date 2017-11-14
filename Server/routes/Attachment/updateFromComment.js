const {requiresLogin} = require('../../config/middlewares/authorization')
const {cardExists} = require('../../config/middlewares/cardAuthorizations')
const {listExists, hasCardInside} = require('../../config/middlewares/listAuthorizations')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
    /**
    * @swagger
    * /boards/{boardId}/lists/{listId}/cards/{cardId}/comments/{commentId}/attachments/{attachmentId}:
    *   put:
    *     tags:
    *       - Attachments
    *     description: Update an attachment in a comment
    *     summary: Update an attachment in a comment
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to update the attachment
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
    *       - name: commentId
    *         type: string
    *         description: The comment id where the attachment is
    *         in: path
    *         required: true
    *       - name: attachmentId
    *         type: string
    *         description: The attachment id where we want to update the attachment
    *         in: path
    *         required: true
    *       - name: body
    *         description: The attachment object that needs to be update
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/Attachment'
    *     responses:
    *       200:
    *         description: Message confirming the attachment has been updated
    *       500:
    *         description: Internal error
    */
  router.put('/boards/:boardId/lists/:listId/cards/:cardId/comments/:commentId/attachments', [requiresLogin, cardExists, listExists, hasCardInside, isCollaborator], (req, res) => {
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
