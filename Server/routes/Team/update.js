const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
module.exports = (router, controller) => {
  /**
    * @swagger
    * /teams/{teamId}:
    *   put:
    *     tags:
    *       - Teams
    *     description: Update a team inside a board
    *     summary: UPDATE a new Team inside a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: listId
    *         type: string
    *         description: The team id to update
    *         in: path
    *         required: true
    *       - name: body
    *         description: The Team object that needs to be added
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/Team'
    *     responses:
    *       200:
    *         description: Message confirming the Team has been updated
    *       500:
    *         description: Internal error
    */
  router.put('/teams/:teamId', [requiresLogin], function (req, res) {
    let requiredParameter = ['teamId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controller.updateTeam(req).then((data) => {
      res.status(200).json('Successfully updated')
    }).catch((err) => {
      res.status(500).json(err)
    })
  })
}
