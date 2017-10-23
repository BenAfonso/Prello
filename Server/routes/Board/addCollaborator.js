const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {isOwner, boardExists} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
  /**
    * @swagger
    * definitions:
    *   NewCollaborator:
    *     properties:
    *       userId:
    *         type: string
    */
  /**
    * @swagger
    * /boards/{boardId}/collaborators:
    *   post:
    *     tags:
    *       - Boards
    *     description: Add a collaborator in a board
    *     summary: Add a collaborator in a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to add the collaborator
    *         in: path
    *         required: true
    *       - name: body
    *         description: The user id that needs to be added
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/NewCollaborator'
    *     responses:
    *       201:
    *         description: Message confirming the collaborator has been created
    *       500:
    *         description: Internal error
    */
  router.post('/boards/:boardId/collaborators', [requiresLogin, boardExists, isOwner], function (req, res) {
    let requiredBody = ['email']
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
    controller.addCollaboratorEmail(req.params.boardId, req.body.email, req.user._id).then((data) => {
      res.status(201).json(data)
    }).catch((err) => {
      res.status(err.status).json(err)
    })
  })
}
