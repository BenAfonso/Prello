const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')

module.exports = (router, controller) => {
  /**
  * @swagger
  * /Teams:
  *   post:
  *     tags:
  *       - Teams
  *     description: Create a new Team
  *     summary: CREATE a new Team
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         description: The Team object that needs to be added
  *         in: body
  *         required: true
  *         schema:
  *             $ref: '#/definitions/Team'
  *     responses:
  *       201:
  *         description: The newly created team
  *       500:
  *         description: Internal error
  */
  router.post('/teams', [requiresLogin], (req, res) => {
    let requiredBody = ['name']
    requiredBody = Util.checkRequest(req.body, requiredBody)
    if (requiredBody.length > 0) {
      let stringMessage = requiredBody.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controller
      .createTeam(req.body.name, req.user._id)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })
}
