const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')

module.exports = (router, controller) => {
  /**
    * @swagger
    * definitions:
    *   NewCollaborator:
    *     properties:
    *       email:
    *         type: string
    */
  /**
    * @swagger
    * /teams/{teamId}/collaborators:
    *   post:
    *     tags:
    *       - Teams
    *     description: Add a collaborator in a board
    *     summary: Add a collaborator in a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: teamId
    *         type: string
    *         description: The team id where we want to add the collaborator
    *         in: path
    *         required: true
    *       - name: body
    *         description: The user email that needs to be added
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/NewCollaborator'
    *     responses:
    *       200:
    *         description: Message confirming the collaborator has been added
    *       500:
    *         description: Internal error
    */
  router.post('/teams/:teamId/collaborators', [requiresLogin], function (req, res) {
    let requiredBody = ['email']
    let requiredParameter = ['teamId']
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
    controller.addCollaboratorEmail(req.params.teamId, req.body.email).then((data) => {
      res.status(200).json(data)
    }).catch((err) => {
      res.status(err.status).json(err)
    })
  })
}
