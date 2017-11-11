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
    * /boards/{boardId}/teams:
    *   post:
    *     tags:
    *       - Boards
    *     description: Add a team in a board
    *     summary: Add a team in a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to add the teams
    *         in: path
    *         required: true
    *       - name: body
    *         description: The team id that needs to be added
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/teamId'
    *     responses:
    *       200:
    *         description: Message confirming the team has been added
    *       500:
    *         description: Internal error
    */
  router.post('/boards/:boardId/teams', [requiresLogin, boardExists, isOwner], function (req, res) {
    let requiredBody = ['teamId']
    requiredBody = Util.checkRequest(req.body, requiredBody)
    if (requiredBody.length > 0) {
      let stringMessage = requiredBody.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controller.addTeam(req.params.boardId, req.body.teamId).then((data) => {
      res.status(201).json(data)
    }).catch((err) => {
      res.status(err.status).json(err)
    })
  })
}
