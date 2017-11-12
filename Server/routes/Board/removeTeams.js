const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {isOwner, boardExists} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
  /**
    * @swagger
    * definitions:
    *   NewTeams:
    *     properties:
    *       teamId:
    *         type: string
    */
  /**
    * @swagger
    * /boards/{boardId}/teams/{teamId}:
    *   delete:
    *     tags:
    *       - Boards
    *     description: Remove a team in a board
    *     summary: Remove a team in a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to remove the teams
    *         in: path
    *         required: true
    *       - name: body
    *         description: The team id that needs to be removed
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/teamId'
    *     responses:
    *       200:
    *         description: Message confirming the team has been removed
    *       500:
    *         description: Internal error
    */
  router.delete('/boards/:boardId/teams/:teamId', [requiresLogin, boardExists, isOwner], function (req, res) {
    let requiredParameter = ['teamId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)    
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controller.removeTeam(req.params.boardId, req.params.teamId).then((data) => {
      res.status(201).json(data)
    }).catch((err) => {
      res.status(err.status).json(err)
    })
  })
}
