const {requiresLogin} = require('../../config/middlewares/authorization')

module.exports = (router, controller) => {
  /**
    * @swagger
    * /teams/{teamId}/setadmins/{userId}:
    *   post:
    *     tags:
    *       - Teams
    *     description: Add an admin in a team
    *     summary: Add an admin in a team
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: teamId
    *         type: string
    *         description: The team id where we want to add the admin
    *         in: path
    *         required: true
    *       - name: userId
    *         description: The user id that needs to be added as admin
    *         in: path
    *         required: true
    *     responses:
    *       200:
    *         description: Message confirming the collaborator has been added as admin
    *       500:
    *         description: Internal error
    */
  router.post('/teams/:teamId/setadmins/:userId', [requiresLogin], function (req, res) {
    controller.setAdmin(req.params.teamId, req.params.userId).then((data) => {
      res.status(200).json(data)
    }).catch((err) => {
      res.status(err.status).json(err)
    })
  })
}
