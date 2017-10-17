const {requiresLogin, board} = require('../../config/middlewares/authorization')

module.exports = function (router, controller) {
  /**
  * @swagger
  * /users/{userId}/boards:
  *   get:
  *     tags:
  *       - Boards
  *     description: Get all my boards
  *     summary: GET ALL my Boards
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: userId
  *         type: string
  *         description: The user id we want to retrieve his boards
  *         in: path
  *         required: true
  *     responses:
  *       200:
  *         description: An array of Boards
  *         schema:
  *           $ref: '#/definitions/Board'
  *       500:
  *         description: Internal error
  */
  router.get('/users/:userId/boards', [requiresLogin], function (req, res) {
    controller.getUserBoards(req.params.userId).then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(500).json(err)
      })
  })
}
