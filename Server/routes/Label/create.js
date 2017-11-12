const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
  /**
    * @swagger
    * /boards/{boardId}/labels:
    *   post:
    *     tags:
    *       - Labels
    *     description: Create a new Label inside a Board
    *     summary: CREATE a new Label inside a Card
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to create the Label
    *         in: path
    *         required: true
    *       - name: body
    *         description: The Label object that needs to be added
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/Label'
    *     responses:
    *       201:
    *         description: Message confirming the Label has been created
    *       500:
    *         description: Internal error
    */
  router.post('/boards/:boardId/labels', [requiresLogin, isCollaborator], function (req, res) {
    let requiredBody = ['name', 'color']
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

    controller.createLabel(req).then((data) => {
      res.status(201).json(data)
    })
      .catch((err) => {
        res.status(err.code).json(err.message)
      })
  })
}
