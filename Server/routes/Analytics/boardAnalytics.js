
module.exports = function (router, controller) {
  /**
  * @swagger
  * /analytics/boards/{boardId}:
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
  *       - name: per
  *         type: string
  *         description: The board id where we want to retrieve
  *         in: query
  *         required: true
  *       - name: from
  *         type: string
  *         description: The board id where we want to retrieve
  *         in: query
  *       - name: to
  *         type: string
  *         description: The board id where we want to retrieve
  *         in: query
  *     responses:
  *       200:
  *         description: One board
  *       500:
  *         description: Internal error
  */
  router.get('/analytics/boards/:boardId', [], function (req, res) {
    controller.getBoardAnalytics(req.params.boardId, req.query.per, req.query.from, req.query.to).then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(err.status).json(err)
      })
  })
}
