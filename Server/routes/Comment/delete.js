const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {cardExists} = require('../../config/middlewares/cardAuthorizations')
const {listExists, hasCardInside} = require('../../config/middlewares/listAuthorizations')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')
module.exports = (router, controllers) => {
  /**
  * @swagger
  * /boards/{boardId}/lists/{listId}/cards/{cardId}/comments/{commentId}:
  *   delete:
  *     tags:
  *       - Comments
  *     description: Delete a comment by his id
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: boardId
  *         description: The id of the board object where the Card is
  *         in: path
  *         required: true
  *         schema:
  *           type: integer
  *       - name: listId
  *         description: The id of the list object where the Card is
  *         in: path
  *         required: true
  *         schema:
  *           type: integer
  *       - name: cardId
  *         description: The id of the Card  object where the comment is
  *         in: path
  *         required: true
  *         schema:
  *           type: integer
  *       - name: commentId
  *         description: The id of the comment object that needs to be deleted
  *         in: path
  *         required: true
  *         schema:
  *           type: integer
  *     responses:
  *       201:
  *         description: Comment deleted
  *       500:
  *         description: Internal server error
  *       404:
  *         description: Comment doesn't exist
  */
  router.delete('/boards/:boardId/lists/:listId/cards/:cardId/comments/:commentId', [requiresLogin, cardExists, listExists, hasCardInside, isCollaborator], function (req, res) {
    let requiredParameter = ['listId', 'boardId', 'cardId', 'commentId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controllers.removeComment(req.params.boardId, req.params.listId, req.params.cardId, req.params.commentId).then((data) => {
      res.status(200).send('The comment has been deleted')
    })
      .catch((err) => {
        res.status(500).json(err)
      })
  })
}
