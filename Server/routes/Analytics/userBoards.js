module.exports = function (router, controller) {
  /**
  * @swagger
  * /analytics/users/{userId}/boards:
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
  router.get('/analytics/users/:userId/boards', [], function (req, res) {
    controller.getBoardAnalytics(req.params.userId).then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(err.status).json(err)
      })
  })
}
