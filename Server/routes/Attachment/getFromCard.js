// const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
      /**
    * @swagger
    * /boards/{boardId}/lists/{listId}/cards/{cardId}/attachments:
    *   get:
    *     tags:
    *       - Attachments
    *     description: Get all attachment from a card
    *     summary: Get all attachment from a card
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where where the card is
    *         in: path
    *         required: true
    *       - name: listId
    *         type: string
    *         description: The list id where the card is
    *         in: path
    *         required: true
    *       - name: cardId
    *         type: string
    *         description: The card id where the card is
    *         in: path
    *         required: true
    *     responses:
    *       200:
    *         description: The card's attachment
    *         schema:
    *           $ref: '#/definitions/Attachment'
    *       500:
    *         description: Internal error
    */
  router.get('/boards/:boardId/lists/:listId/cards/:cardId/attachments', [requiresLogin, isCollaborator], (req, res) => {
    res.status(200).send('Not implemented yet')
  })
}
