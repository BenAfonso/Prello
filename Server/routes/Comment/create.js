const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {cardExists} = require('../../config/middlewares/cardAuthorizations')
const {listExists, hasCardInside} = require('../../config/middlewares/listAuthorizations')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
  /**
    * @swagger
    * definitions:
    *   NewComment:
    *     properties:
    *       text:
    *         type: string
    */

  /**
    * @swagger
    * /boards/{boardId}/lists/{listId}/cards/{cardId}/comments:
    *   post:
    *     tags:
    *       - Comments
    *     description: Create a new Comment inside a Card
    *     summary: CREATE a new Comment inside a Card
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
    *         description: The Comment object that needs to be added
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/NewComment'
    *     responses:
    *       201:
    *         description: Message confirming the Comment has been created
    *       500:
    *         description: Internal error
    */
  router.post('/boards/:boardId/lists/:listId/cards/:cardId/comments', [requiresLogin, cardExists, listExists, hasCardInside, isCollaborator], function (req, res) {
    let requiredBody = ['text']
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

    controller.createComment(req).then((data) => {
      res.status(201).json(data)
    })
      .catch((err) => {
        res.status(err.code).json(err.message)
      })
  })
}
