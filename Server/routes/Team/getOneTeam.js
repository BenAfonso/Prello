const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
module.exports = function (router, controller) {
  /**
  * @swagger
  * /teams/{teamId}:
  *   get:
  *     tags:
  *       - Teams
  *     description: Get One team
  *     summary: GET One team
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: teamId
  *         type: string
  *         description: The team id we want to retrieve
  *         in: path
  *         required: true
  *     responses:
  *       200:
  *         description: One team
  *         schema:
  *           $ref: '#/definitions/Team'
  *       500:
  *         description: Internal error
  */
  router.get('/teams/:teamId', [requiresLogin], function (req, res) {
    let requiredParameter = ['teamId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controller.getOneTeam(req.params.teamId).then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(err.status).json(err)
      })
  })
}
