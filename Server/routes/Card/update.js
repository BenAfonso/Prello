const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')

const {cardExists} = require('../../config/middlewares/cardAuthorizations')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controllers) => {
  /**
    * @swagger
    * definitions:
    *   NewCard:
    *     properties:
    *       text:
    *         type: string
    *       isArchived:
    *         type: bool
    */

  /**
    * @swagger
    * /boards/{id}/cards/{cardId}:
    *   put:
    *     tags:
    *       - Cards
    *     description: Update a card inside a board
    *     summary: UPDATE a card inside a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: id
    *         type: string
    *         description: The board id where we want to update the card
    *         in: path
    *         required: true
    *       - name: cardId
    *         type: string
    *         description: The card id to update
    *         in: path
    *         required: true
    *       - name: body
    *         description: The Card object that needs to be added
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/NewCard'
    *     responses:
    *       200:
    *         description: Message confirming the Card has been updated
    *       500:
    *         description: Internal error
    */
  router.put('/boards/:boardId/cards/:cardId', [requiresLogin, cardExists, isCollaborator], function (req, res) {
    let requiredParameter = ['cardId', 'boardId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controllers.updateCard(req).then((data) => {
      res.status(200).json('Successfully updated')
    }).catch((err) => {
      res.status(500).json(err)
    })
  })
}
