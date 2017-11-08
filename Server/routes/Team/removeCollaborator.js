const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')

module.exports = (router, controller) => {
  /**
    * @swagger
    * /teams/{teamId}/collaborators/{userId}:
    *   delete:
    *     tags:
    *       - Teams
    *     description: Add a collaborator in a team
    *     summary: Add a collaborator in a team
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: teamId
    *         type: string
    *         description: The team id where we want to remove the collaborator
    *         in: path
    *         required: true
    *       - name: userId
    *         type: string
    *         description: The user id where we want to remove as a collaborator
    *         in: path
    *         required: true
    *     responses:
    *       200:
    *         description: Message confirming the collaborator has been removed from the team
    *       500:
    *         description: Internal error
    */
  router.delete('/teams/:teamId/collaborators/:userId', [requiresLogin], function (req, res) {
    let requiredParameter = ['teamId', 'userId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controller.removeCollaboratorFromTeam(req.params.teamId, req.params.userId).then((data) => {
      res.status(200).json('Successfully removed')
    }).catch((err) => {
      res.status(err.status).json(err)
    })
  })
}
