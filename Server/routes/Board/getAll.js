const {requiresLogin, board} = require('../../config/middlewares/authorization')

module.exports = function (router, controller) {
  /**
  * @swagger
  * /boards:
  *   get:
  *     tags:
  *       - Boards
  *     description: Get all boards
  *     summary: GET ALL Boards
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: An array of Boards
  *         schema:
  *           $ref: '#/definitions/Board'
  *       500:
  *         description: Internal error
  */
  router.get('/boards', [requiresLogin, board.hasAuthorization], function (req, res) {
    controller.getAllBoards().then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(500).json(err)
      })
  })
}
