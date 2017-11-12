const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {boardExists} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
  /**
    * @swagger
    * /boards/{boardId}/labels/{labelId}:
    *   delete:
    *     tags:
    *       - Labels
    *     description: Remove a label in a board
    *     summary: Remove a label in a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to delete the label
    *         in: path
    *         required: true
    *       - name: labelId
    *         type: string
    *         description: The label id where we want to delete
    *         in: path
    *         required: true
    *     responses:
    *       200:
    *         description: Message confirming the label has been removed from the board
    *       500:
    *         description: Internal error
    */
  router.delete('/boards/:boardId/labels/:labelId', [requiresLogin, boardExists], function (req, res) {
    let requiredParameter = ['boardId', 'labelId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controller.removeLabel(req.params.boardId, req.params.labelId).then((data) => {
      res.status(200).json('Successfully deleted')
    }).catch((err) => {
      res.status(err.status).json(err)
    })
  })
}
