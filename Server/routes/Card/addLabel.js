const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {cardExists} = require('../../config/middlewares/cardAuthorizations')
const {listExists, hasCardInside} = require('../../config/middlewares/listAuthorizations')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
    /**
    * @swagger
    * definitions:
    *   LabelToAdd:
    *     properties:
    *       labelId:
    *         type: string
    */
  /**
    * @swagger
    * /boards/{boardId}/lists/{listId}/cards/{cardId}/label:
    *   post:
    *     tags:
    *       - Cards
    *     description: Add a label inside a Card
    *     summary: Add a label inside a Card
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to insert the Label
    *         in: path
    *         required: true
    *       - name: listId
    *         type: string
    *         description: The list id where we want to insert the Label
    *         in: path
    *         required: true
    *       - name: cardId
    *         type: string
    *         description: The Card id where we want to insert the Label
    *         in: path
    *         required: true
    *       - name: body
    *         description: The label id object that needs to be added
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/LabelToAdd'
    *     responses:
    *       200:
    *         description: Message confirming the label has been added
    *       500:
    *         description: Internal error
    */
  router.post('/boards/:boardId/lists/:listId/cards/:cardId/label', [requiresLogin, cardExists, listExists, hasCardInside, isCollaborator], function (req, res) {
    let requiredBody = ['labelId']
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

    controller.addLabel(req.params.boardId, req.params.cardId, req.params.listId, req.body.labelId).then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(err.code).json(err.message)
      })
  })
}
