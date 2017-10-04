module.exports = (router, controllers) => {
  /**
    * @swagger
    * definitions:
    *   MoveList:
    *     properties:
    *       position:
    *         type: int
    */

  /**
    * @swagger
    * /boards/{boardId}/lists/{listId}/move:
    *   put:
    *     tags:
    *       - Lists
    *     description: Update a list inside a board
    *     summary: UPDATE a new List inside a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to update the list
    *         in: path
    *         required: true
    *       - name: listId
    *         type: string
    *         description: The list id to update
    *         in: path
    *         required: true
    *       - name: body
    *         description: The position that needs to be added
    *         in: body
    *         required: true
    *         schema:
    *           properties:
    *            position:
    *              type: int
    *     responses:
    *       200:
    *         description: Message confirming the List position has been replaced
    *       500:
    *         description: Internal error
    */
  router.put('/boards/:boardId/lists/:listId/move', function (req, res) {
    controllers.boardController.moveList(req).then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(500).json(err)
      })
  })
}
