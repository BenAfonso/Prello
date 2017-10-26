const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {hasCardInside} = require('../../config/middlewares/listAuthorizations')
const {isCollaborator, hasListInside} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
  /**
    * @swagger
    * /boards/{boardId}/lists/{listId}/cards/{cardId}/checklists:
    *   post:
    *     tags:
    *       - Checklist
    *     description: Create a new Checklist inside a Card
    *     summary: CREATE a new Checklist inside a Card
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to insert the Checklist
    *         in: path
    *         required: true
    *       - name: listId
    *         type: string
    *         description: The list id where we want to insert the Checklist
    *         in: path
    *         required: true
    *       - name: cardId
    *         type: string
    *         description: The Card id where we want to insert the Checklist
    *         in: path
    *         required: true
    *       - name: body
    *         description: The Checklist object that needs to be added
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/NewChecklist'
    *     responses:
    *       201:
    *         description: Message confirming the Checklist has been created
    *       500:
    *         description: Internal error
    */
  router.post('/boards/:boardId/lists/:listId/cards/:cardId/checklists', [requiresLogin, isCollaborator, hasListInside, hasCardInside], function (req, res) {
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

    controller.createChecklist(req).then((data) => {
      res.status(201).json(data)
    })
      .catch((err) => {
        res.status(err.code).json(err.message)
      })
  })
}
