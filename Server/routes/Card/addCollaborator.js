const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {cardExists} = require('../../config/middlewares/cardAuthorizations')
const {listExists, hasCardInside} = require('../../config/middlewares/listAuthorizations')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
    /**
    * @swagger
    * definitions:
    *   CardAddCollaborator:
    *     properties:
    *       email:
    *         type: string
    */
  /**
    * @swagger
    * /boards/{boardId}/lists/{listId}/cards/{cardId}/collaborator:
    *   post:
    *     tags:
    *       - Cards
    *     description: Add a collaborator inside a Card
    *     summary: Add a collaborator inside a Card
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to insert the Comment
    *         in: path
    *         required: true
    *       - name: listId
    *         type: string
    *         description: The list id where we want to insert the Comment
    *         in: path
    *         required: true
    *       - name: cardId
    *         type: string
    *         description: The Card id where we want to insert the Comment
    *         in: path
    *         required: true
    *       - name: body
    *         description: The user id object that needs to be added
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/CardAddCollaborator'
    *     responses:
    *       201:
    *         description: Message confirming the Comment has been created
    *       500:
    *         description: Internal error
    */
  router.post('/boards/:boardId/lists/:listId/cards/:cardId/collaborator', [requiresLogin, cardExists, listExists, hasCardInside, isCollaborator], function (req, res) {
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

    controller.addCollaboratorEmail(req.params.boardId, req.body.email, req.user._id).then((data) => {
      res.status(201).json(data)
    })
      .catch((err) => {
        res.status(err.code).json(err.message)
      })
  })
}
