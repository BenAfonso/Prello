const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {boardExists} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
  /**
  * @swagger
  * /boards/{boardId}:
  *   delete:
  *     tags:
  *       - Boards
  *     description: Delete a board
  *     summary: DELETE a Board
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: boardId
  *         type: string
  *         description: The board id to delete
  *         in: path
  *         required: true
  *     responses:
  *       201:
  *         description: Message confirming the board has been deleted
  *       500:
  *         description: Internal error
  */
  router.delete('/boards/:boardId', [requiresLogin, boardExists], function (req, res) {
    let requiredParameter = ['boardId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controller
      .deleteBoard(req.params.boardId)
      .then(data => {
        res.status(201).json('Successfully deleted')
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })
}
