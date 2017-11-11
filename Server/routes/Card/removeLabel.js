const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {cardExists} = require('../../config/middlewares/cardAuthorizations')
const {listExists, hasCardInside} = require('../../config/middlewares/listAuthorizations')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
  /**
    * @swagger
    * /boards/{boardId}/lists/{listId}/cards/{cardId}/labels/{labelId}:
    *   delete:
    *     tags:
    *       - Cards
    *     description: Remove a label from a card
    *     summary: Remove a label from a card
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to remove the label
    *         in: path
    *         required: true
    *       - name: listId
    *         type: string
    *         description: The list id where we want to remove the label
    *         in: path
    *         required: true
    *       - name: cardId
    *         type: string
    *         description: The Card id where we want to remove the label
    *         in: path
    *         required: true
    *       - name: labelId
    *         type: string
    *         description: The label id where we want to remove
    *         in: path
    *         required: true
    *     responses:
    *       200:
    *         description: Message confirming the Label has been removed
    *       500:
    *         description: Internal error
    */
  router.delete('/boards/:boardId/lists/:listId/cards/:cardId/labels/:labelId', [requiresLogin, cardExists, listExists, hasCardInside, isCollaborator], function (req, res) {
    let requiredParameter = ['cardId', 'boardId', 'listId', 'cardId', 'labelId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }

    controller.removeLabel(req.params.boardId, req.params.cardId, req.params.listId, req.params.labelId).then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(err.code).json(err.message)
      })
  })
}
