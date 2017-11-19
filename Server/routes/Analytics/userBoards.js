const {requiresLogin} = require('../../config/middlewares/authorization')
module.exports = function (router, controller) {
  /**
  * @swagger
  * /analytics/boards:
  *   get:
  *     tags:
  *       - Analytics
  *     description: Get One board
  *     summary: GET One Boards
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: boardId
  *         type: string
  *         description: The board id where we want to retrieve
  *         in: path
  *         required: true
  *       - name: userId
  *         type: string
  *         description: The board id where we want to retrieve
  *         in: path
  *         required: true
  *     responses:
  *       200:
  *         description: One board
  *       500:
  *         description: Internal error
  */
  router.get('/analytics/boards/', [requiresLogin], function (req, res) {
    controller.getBoardAnalytics(req.user._id).then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(err.status).json(err)
      })
  })
}
