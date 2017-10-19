const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {boardExists, canRead} = require('../../config/middlewares/boardAuthorizations')

module.exports = function (router, controller) {
  /**
  * @swagger
  * /boards/{boardId}:
  *   get:
  *     tags:
  *       - Boards
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
  *     responses:
  *       200:
  *         description: One board
  *         schema:
  *           $ref: '#/definitions/Board'
  *       500:
  *         description: Internal error
  */
  router.get('/boards/:boardId', [requiresLogin, boardExists, canRead], function (req, res) {
    let requiredParameter = ['boardId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controller.getOneboard(req.params.boardId, req.user._id).then((data) => {
      res.status(200).json(data)
    })
      .catch((err) => {
        res.status(err.status).json(err)
      })
  })
}
