const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')

const {listExists} = require('../../config/middlewares/listAuthorizations')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controllers) => {
  /**
    * @swagger
    * definitions:
    *   NewList:
    *     properties:
    *       name:
    *         type: string
    *       isArchived:
    *         type: bool
    */

  /**
    * @swagger
    * /boards/{id}/lists/{listId}:
    *   put:
    *     tags:
    *       - Lists
    *     description: Update a list inside a board
    *     summary: UPDATE a new List inside a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: id
    *         type: string
    *         description: The board id where we want to insert the list
    *         in: path
    *         required: true
    *       - name: listId
    *         type: string
    *         description: The list id to update
    *         in: path
    *         required: true
    *       - name: body
    *         description: The List object that needs to be added
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/NewList'
    *     responses:
    *       200:
    *         description: Message confirming the List has been created
    *       500:
    *         description: Internal error
    */
  router.put('/boards/:boardId/lists/:listId', [requiresLogin, listExists, isCollaborator], function (req, res) {
    let requiredParameter = ['listId', 'boardId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controllers.listController.updateList(req).then((data) => {
      res.status(200).json('Successfully updated')
    }).catch((err) => {
      res.status(500).json(err)
    })
  })
}
