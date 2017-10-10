const Util = require('../../controllers/Util')

module.exports = (router, controller) => {
  /**
   * @swagger
   * definitions:
   *   NewBoard:
   *     properties:
   *       title:
   *         type: string
   *       background:
   *         type: string
   *       visibility:
   *         type: string
   *         enum: [public, private, team]
   */

  /**
  * @swagger
  * /boards:
  *   post:
  *     tags:
  *       - Boards
  *     description: Create a new board
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
  *       200:
  *         description: The newly created board
  *       500:
  *         description: Internal error
  */
  router.post('/boards', (req, res) => {
    let requiredBody = ['title']
    requiredBody = Util.checkRequest(req.body, requiredBody)
    if (requiredBody.length > 0) {
      let stringMessage = requiredBody.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controller
      .createBoard(req.body)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })
}
