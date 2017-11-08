const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {cardExists} = require('../../config/middlewares/cardAuthorizations')
const {listExists, hasCardInside} = require('../../config/middlewares/listAuthorizations')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
  /**
    * @swagger
    * /boards/{boardId}/lists/{listId}/cards/{cardId}/responsible:
    *   put:
    *     tags:
    *       - Cards
    *     description: update a responsible inside a Card
    *     summary: update a responsible inside a Card
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to update the responsible
    *         in: path
    *         required: true
    *       - name: listId
    *         type: string
    *         description: The list id where we want to update the responsible
    *         in: path
    *         required: true
    *       - name: cardId
    *         type: string
    *         description: The Card id where we want to update the responsible
    *         in: path
    *         required: true
    *       - name: body
    *         description: The user email object that needs to be added
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/CardAddCollaborator'
    *     responses:
    *       200:
    *         description: Message confirming the Responsible has been updated
    *       500:
    *         description: Internal error
    */
  router.put('/boards/:boardId/lists/:listId/cards/:cardId/responsible', [requiresLogin, cardExists, listExists, hasCardInside, isCollaborator], function (req, res) {
    let requiredBody = ['email']
    let requiredParameter = ['cardId', 'boardId', 'listId']
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

    controller.updateResponsibleEmail(req.params.boardId, req.params.cardId, req.params.listId, req.body.email).then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(err.code).json(err.message)
      })
  })
}
