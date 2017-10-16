const Util = require('../../controllers/Util')
module.exports = (router, controller) => {
  /**
    * @swagger
    * /boards/{boardId}/collaborators/{userId}:
    *   delete:
    *     tags:
    *       - Boards
    *     description: Add a collaborator in a board
    *     summary: Add a collaborator in a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to remove the collaborator
    *         in: path
    *         required: true
    *       - name: userId
    *         type: string
    *         description: The user id where we want to remove as a collaborator
    *         in: path
    *         required: true
    *     responses:
    *       200:
    *         description: Message confirming the collaborator has been removed from the board
    *       500:
    *         description: Internal error
    */
  router.delete('/boards/:boardId/collaborators/:userId', function (req, res) {
    let requiredParameter = ['boardId','userId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controller.removeCollaborator(req.params.boardId, req.params.userId).then((data) => {
      res.status(200).json('Successfully updated')
    }).catch((err) => {
      res.status(500).json(err)
    })
  })
}
