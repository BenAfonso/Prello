module.exports = (router, controller) => {
  /**
    * @swagger
    * definitions:
    *   NewCard:
    *     properties:
    *       text:
    *         type: string
    */

  /**
    * @swagger
    * /lists/{listid}/cards:
    *   post:
    *     tags:
    *       - Card
    *     description: Create a new Card inside a List
    *     summary: CREATE a new Card inside a List
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: listid
    *         type: string
    *         description: The list id where we want to insert the Card
    *         in: path
    *         required: true
    *       - name: body
    *         description: The Card object that needs to be added
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/NewCard'
    *     responses:
    *       200:
    *         description: Message confirming the Card has been created
    *       500:
    *         description: Internal error
    */
  router.post('/lists/:listid/cards', function (req, res) {
    controller.createCard(req).then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(500).json(err)
      })
  })
}
