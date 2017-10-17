const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')

const {boardExists, isCollaborator} = require('../../config/middlewares/boardAuthorizations')
module.exports = (router, controllers) => {
  /**
    * @swagger
    * definitions:
    *   NewList:
    *     properties:
    *       name:
    *         type: string
    */

  /**
    * @swagger
    * /boards/{boardId}/lists:
    *   post:
    *     tags:
    *       - Lists
    *     description: Create a new List inside a Board
    *     summary: CREATE a new List inside a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to insert the list
    *         in: path
    *         required: true
    *       - name: body
    *         description: The List object that needs to be added
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/NewList'
    *     responses:
    *       201:
    *         description: Message confirming the List has been created
    *       500:
    *         description: Internal error
    */
  router.post('/boards/:boardId/lists', [requiresLogin, boardExists, isCollaborator], function (req, res) {
    let requiredBody = ['name']
    let requiredParameter = ['boardId']
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
    controllers.listController.createList(req).then((data) => {
      res.status(201).json(data)
    })
      .catch((err) => {
        res.status(500).json(err)
      })
  })
}
