const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')

const {boardExists, isCollaborator} = require('../../config/middlewares/boardAuthorizations')
const {cardExists} = require('../../config/middlewares/cardAuthorizations')

module.exports = (router, controllers) => {
  /**
  * @swagger
  * /boards/{boardId}/lists/{listId}/cards/{cardId}:
  *   delete:
  *     tags:
  *       - Cards
  *     description: Delete a row by his id
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: boardId
  *         description: The id of the board object where the Card is
  *         in: path
  *         required: true
  *         schema:
  *           type: integer
  *       - name: listId
  *         description: The id of the list object where the Card is
  *         in: path
  *         required: true
  *         schema:
  *           type: integer
  *       - name: cardId
  *         description: The id of the Card object that needs to be deleted
  *         in: path
  *         required: true
  *         schema:
  *           type: integer
  *     responses:
  *       201:
  *         description: Card deleted
  *       500:
  *         description: Internal server error
  *       404:
  *         description: Card doesn't exist
  */
  router.delete('/boards/:boardId/lists/:listId/cards/:cardId', [requiresLogin, boardExists, isCollaborator, cardExists], function (req, res) {
    let requiredParameter = ['listId', 'boardId', 'cardId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controllers.removeCard(req.params.boardId, req.params.listId, req.params.cardId).then((data) => {
      res.status(200).send('The card has been deleted')
    })
      .catch((err) => {
        res.status(500).json(err)
      })
  })
}
