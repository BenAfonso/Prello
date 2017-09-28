module.exports = function (router, controller) {
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
  *         description: Message confirming the board has been created
  *       500:
  *         description: Internal error
  */
  router.post('/boards', function (req, res) {
    controller.createBoard(req.body).then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
  })
}
