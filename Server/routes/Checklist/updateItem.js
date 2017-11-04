const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {hasCardInside} = require('../../config/middlewares/listAuthorizations')
const {isCollaborator, hasListInside} = require('../../config/middlewares/boardAuthorizations')
const {checkListExists, itemExists} = require('../../config/middlewares/checkListAuthorizations')

module.exports = (router, controller) => {
  /**
    * @swagger
    * /boards/{boardId}/lists/{listId}/cards/{cardId}/checklists/{checklistId}/items/{itemId}:
    *   put:
    *     tags:
    *       - Items
    *     description: update item inside a checklist
    *     summary: update item inside a checklist
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to update the Item
    *         in: path
    *         required: true
    *       - name: listId
    *         type: string
    *         description: The list id where we want to update the Item
    *         in: path
    *         required: true
    *       - name: cardId
    *         type: string
    *         description: The Card id where we want to update the Item
    *         in: path
    *         required: true
    *       - name: checklistId
    *         type: string
    *         description: The Checklist id where we want to update the Item
    *         in: path
    *         required: true
    *       - name: itemId
    *         type: string
    *         description: The item id we want to checked
    *         in: path
    *         required: true
    *       - name: body
    *         description: The Item object that needs to be update
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/Item'
    *     responses:
    *       200:
    *         description: Message confirming the Item has been updated
    *       500:
    *         description: Internal error
    */
  router.put('/boards/:boardId/lists/:listId/cards/:cardId/checklists/:checklistId/items/:itemId', [requiresLogin, isCollaborator, hasListInside, hasCardInside, checkListExists, itemExists], function (req, res) {
    let requiredParameter = ['cardId', 'boardId', 'listId', 'checklistId', 'itemId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }

    controller.updateItem(req).then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(err.code).json(err.message)
      })
  })
}
