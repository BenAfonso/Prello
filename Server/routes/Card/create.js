const Util = require('../../controllers/Util')
const {listExists} = require('../../config/middlewares/ListAuthorizations')

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
    * /boards/{boardId}/lists/{listid}/cards:
    *   post:
    *     tags:
    *       - Cards
    *     description: Create a new Card inside a List
    *     summary: CREATE a new Card inside a List
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to insert the Card
    *         in: path
    *         required: true
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
    *       201:
    *         description: Message confirming the Card has been created
    *       500:
    *         description: Internal error
    */
  router.post('/boards/:boardId/lists/:listId/cards', [listExists], function (req, res) {
    let requiredBody = ['text']
    let requiredParameter = ['listId', 'boardId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    requiredBody = Util.checkRequest(req.body, requiredBody)
    if (requiredBody.length > 0) {
      let stringMessage = requiredBody.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }

    controller.createCard(req).then((data) => {
      res.status(201).json(data)
    })
      .catch((err) => {
        res.status(err.code).json(err.message)
      })
  })
}
