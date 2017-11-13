const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {boardExists, isCollaborator} = require('../../config/middlewares/boardAuthorizations')
const {cardExists} = require('../../config/middlewares/cardAuthorizations')
const {listExists, hasCardInside} = require('../../config/middlewares/listAuthorizations')

module.exports = function (router, controller) {
  /**
  * @swagger
  * /boards/{boardId}/lists/{listId}/cards/{cardId}:
  *   get:
  *     tags:
  *       - Cards
  *     description: Get One card
  *     summary: GET One card
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: boardId
  *         type: string
  *         description: The board id where the card is inside
  *         in: path
  *         required: true
  *       - name: listId
  *         type: string
  *         description: The list id where the card is inside
  *         in: path
  *         required: true
  *       - name: cardId
  *         type: string
  *         description: The card id where we want to retrieve
  *         in: path
  *         required: true
  *     responses:
  *       200:
  *         description: One card
  *         schema:
  *           $ref: '#/definitions/Card'
  *       500:
  *         description: Internal error
  */
  router.get('/boards/:boardId/lists/:listId/cards/:cardId', [requiresLogin, boardExists, cardExists, listExists, hasCardInside, isCollaborator], function (req, res) {
    let requiredParameter = ['boardId', 'listId', 'cardId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controller.getOneCard(req.params.cardId, req.user._id).then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(err.status).json(err)
      })
  })
}
