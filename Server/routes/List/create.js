module.exports = (router, controllers) => {
  /**
    * @swagger
    * definitions:
    *   NewList:
    *     properties:
    *       name:
    *         type: string
    */

  /**
    * @swagger
    * /boards/{id}/lists:
    *   post:
    *     tags:
    *       - Lists
    *     description: Create a new List inside a Board
    *     summary: CREATE a new List inside a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: id
    *         type: string
    *         description: The board id where we want to insert the list
    *         in: path
    *         required: true
    *       - name: body
    *         description: The List object that needs to be added
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/NewList'
    *     responses:
    *       200:
    *         description: Message confirming the List has been created
    *       500:
    *         description: Internal error
    */
  router.post('/boards/:boardid/lists', function (req, res) {
    controllers.listController.createList(req).then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(500).json(err)
      })
  })
}
