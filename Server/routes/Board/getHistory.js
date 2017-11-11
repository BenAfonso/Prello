const {requiresLogin} = require('../../config/middlewares/authorization')
const {boardExists, canRead} = require('../../config/middlewares/boardAuthorizations')

module.exports = function (router, controller) {
  /**
  * @swagger
  * /boards/{boardId}/history:
  *   get:
  *     tags:
  *       - Boards
  *     description: Get One board history
  *     summary: GET One Boards
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: boardId
  *         type: string
  *         description: The board id where we want to retrieve the history
  *         in: path
  *         required: true
  *       - name: limit
  *         type: string
  *         description: The number limit of history
  *         in: query
  *         required: true
  *       - name: skip
  *         type: string
  *         description: The number skip to start of history
  *         in: query
  *         required: true
  *     responses:
  *       200:
  *         description: One board
  *         schema:
  *           $ref: '#/definitions/Board'
  *       500:
  *         description: Internal error
  */
  router.get('/boards/:boardId/history', [requiresLogin, boardExists, canRead], function (req, res) {
    controller.getBoardHistory(req.params.boardId, parseInt(req.query.limit), parseInt(req.query.skip)).then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(err.status).json(err)
      })
  })
}
