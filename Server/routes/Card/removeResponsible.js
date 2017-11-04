const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {cardExists} = require('../../config/middlewares/cardAuthorizations')
const {listExists, hasCardInside} = require('../../config/middlewares/listAuthorizations')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
  /**
    * @swagger
    * /boards/{boardId}/lists/{listId}/cards/{cardId}/responsible:
    *   delete:
    *     tags:
    *       - Cards
    *     description: delete a responsible inside a Card
    *     summary: delete a responsible inside a Card
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to delete the responsible
    *         in: path
    *         required: true
    *       - name: listId
    *         type: string
    *         description: The list id where we want to delete the responsible
    *         in: path
    *         required: true
    *       - name: cardId
    *         type: string
    *         description: The Card id where we want to delete the responsible
    *         in: path
    *         required: true
    *     responses:
    *       200:
    *         description: Message confirming the Responsible has been deleted
    *       500:
    *         description: Internal error
    */
  router.delete('/boards/:boardId/lists/:listId/cards/:cardId/responsible', [requiresLogin, cardExists, listExists, hasCardInside, isCollaborator], function (req, res) {
    let requiredParameter = ['cardId', 'boardId', 'listId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }

    controller.removeResponsible(req.params.boardId, req.params.cardId, req.params.listId).then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(err.code).json(err.message)
      })
  })
}
