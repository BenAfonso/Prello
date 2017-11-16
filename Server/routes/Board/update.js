const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
module.exports = (router, controller) => {
  /**
    * @swagger
    * /boards/{boardId}:
    *   put:
    *     tags:
    *       - Boards
    *     description: Update a board
    *     summary: UPDATE a board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id to update
    *         in: path
    *         required: true
    *       - name: body
    *         description: The Board object that needs to be added
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/Board'
    *     responses:
    *       200:
    *         description: Message confirming the Board has been updated
    *       500:
    *         description: Internal error
    */
  router.put('/boards/:boardId', [requiresLogin], function (req, res) {
    let requiredParameter = ['boardId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controller.updateBoard(req.params.boardId, req.body).then((data) => {
      res.status(200).json('Successfully updated')
    }).catch((err) => {
      res.status(500).json(err)
    })
  })
}
