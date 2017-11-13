const {requiresLogin} = require('../../config/middlewares/authorization')

module.exports = (router, controller) => {
  /**
    * @swagger
    * /teams/{teamId}/unsetadmins/{userId}:
    *   delete:
    *     tags:
    *       - Teams
    *     description: Remove an admin in a team
    *     summary: Remove an admin in a team
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: teamId
    *         type: string
    *         description: The team id where we want to remove the admin
    *         in: path
    *         required: true
    *       - name: userId
    *         description: The user id that needs to be remove as admin
    *         in: path
    *         required: true
    *     responses:
    *       200:
    *         description: Message confirming the collaborator has been added as admin
    *       500:
    *         description: Internal error
    */
  router.delete('/teams/:teamId/unsetadmins/:userId', [requiresLogin], function (req, res) {
    controller.unsetAdmin(req.params.teamId, req.params.userId).then((data) => {
      res.status(200).json(data)
    }).catch((err) => {
      res.status(err.status).json(err)
    })
  })
}
