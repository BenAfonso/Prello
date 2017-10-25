const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {cardExists} = require('../../config/middlewares/cardAuthorizations')
const {listExists, hasCardInside} = require('../../config/middlewares/listAuthorizations')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controllers) => {
  /**
    * @swagger
    * definitions:
    *   NewComment:
    *     properties:
    *       text:
    *         type: string
    *       isArchived:
    *         type: boolean
    */

  /**
    * @swagger
    * /boards/{boardId}/lists/{listId}/cards/{cardId}/comments/{commentId}:
    *   put:
    *     tags:
    *       - Comments
    *     description: Update a comment
    *     summary: UPDATE a comment
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to update the comment
    *         in: path
    *         required: true
    *       - name: listId
    *         type: string
    *         description: The list id where we want to update the comment
    *         in: path
    *         required: true
    *       - name: cardId
    *         type: string
    *         description: The card id where we want to update the comment
    *         in: path
    *         required: true
    *       - name: commentId
    *         type: string
    *         description: The comment id to update
    *         in: path
    *         required: true
    *       - name: body
    *         description: The Comment object that needs to be updtated
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/NewComment'
    *     responses:
    *       200:
    *         description: Message confirming the comment has been updated
    *       500:
    *         description: Internal error
    */
  router.put('/boards/:boardId/lists/:listId/cards/:cardId/comments/:commentId', [requiresLogin, cardExists, listExists, hasCardInside, isCollaborator], function (req, res) {
    let requiredParameter = ['cardId', 'boardId', 'listId', 'commentId']
    requiredParameter = Util.checkRequest(req.params, requiredParameter)
    if (requiredParameter.length > 0) {
      let stringMessage = requiredParameter.join(',')
      res.status(400).json(`Missing ${stringMessage}`)
      return
    }
    controllers.updateComment(req).then((data) => {
      res.status(200).json('Successfully updated')
    }).catch((err) => {
      res.status(500).json(err)
    })
  })
}
