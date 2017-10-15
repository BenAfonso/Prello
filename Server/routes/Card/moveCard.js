const Util = require('../../controllers/Util')
module.exports = (router, controllers) => {
  /**
    * @swagger
    * definitions:
    *   MoveCard:
    *     properties:
    *       position:
    *         type: integer
    *       oldListId:
    *         type: string
    *       newListId:
    *         type: string
    */

  /**
    * @swagger
    * /boards/{boardId}/cards/{cardId}/move:
    *   put:
    *     tags:
    *       - Cards
    *     description: Move a card inside a board
    *     summary: Move a  card inside a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to update the cards
    *         in: path
    *         required: true
    *       - name: cardId
    *         type: string
    *         description: The card id to update
    *         in: path
    *         required: true
    *       - name: body
    *         description: The position, the old list id and the new list id
    *         in: body
    *         required: true
    *         schema:
    *           properties:
    *            position:
    *              type: integer
    *            oldListId:
    *              type: string
    *            newListId:
    *              type: string
    *     responses:
    *       200:
    *         description: Message confirming the card has been moved
    *       500:
    *         description: Internal error
    */
  router.put('/boards/:boardId/cards/:cardId/move', function (req, res) {
    let requiredBody = ['oldListId', 'newListId', 'position']
    let requiredParameter = ['cardId', 'boardId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    requiredBody = Util.checkRequest(req.body, requiredBody)
    if (requiredBody.length > 0) {
      let stringMessage = requiredBody.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controllers.moveCard(req).then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(500).json(err)
      })
  })
}
