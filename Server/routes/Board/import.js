const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')

module.exports = (router, controller) => {
  /**
   * @swagger
   * definitions:
   *   NewBoard:
   *     properties:
   *       board:
   *         type: array
   *       visibility:
   *         type: string
   *         enum: [public, private, team]
   */

  /**
  * @swagger
  * /boards/import:
  *   post:
  *     tags:
  *       - Boards
  *     description: Import a new board from Trello
  *     summary: CREATE a new Board
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         description: The Board object that needs to be added
  *         in: body
  *         required: true
  *         schema:
  *             $ref: '#/definitions/NewBoard'
  *     responses:
  *       201:
  *         description: The newly imported board
  *       500:
  *         description: Internal error
  */
  router.post('/boards/import', [requiresLogin], (req, res) => {
    let requiredBody = ['name']
    requiredBody = Util.checkRequest(req.body, requiredBody)
    if (requiredBody.length > 0) {
      let stringMessage = requiredBody.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controller
      .importTrelloBoard({...req.body, owner: req.user._id, collaborators: [req.user._id]})
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })
}
