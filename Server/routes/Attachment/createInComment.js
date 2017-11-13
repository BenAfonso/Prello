const {requiresLogin} = require('../../config/middlewares/authorization')
const {cardExists} = require('../../config/middlewares/cardAuthorizations')
const {listExists, hasCardInside} = require('../../config/middlewares/listAuthorizations')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')
const cardController = require('../../controllers/cardController')
const multer = require('multer')
const multerUpload = multer().any()
module.exports = (router, controller) => {
    /**
    * @swagger
    * /boards/{boardId}/lists/{listId}/cards/{cardId}/comments/commentId/attachments:
    *   post:
    *     tags:
    *       - Attachments
    *     description: Add an attachment in a board
    *     summary: Add an attachment in a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to add the attachment
    *         in: path
    *         required: true
    *       - name: listId
    *         type: string
    *         description: The list id where we want to add the attachment
    *         in: path
    *         required: true
    *       - name: cardId
    *         type: string
    *         description: The card id where we want to add the attachment
    *         in: path
    *         required: true
    *       - name: commentId
    *         type: string
    *         description: The comment id where we want to add the attachment
    *         in: path
    *         required: true
    *       - in: formData
    *         name: upfile
    *         type: file
    *         description: The file to upload.
    *         required: true
    *     responses:
    *       201:
    *         description: Message confirming the attachment has been created
    *       500:
    *         description: Internal error
    */
  router.post('/boards/:boardId/lists/:listId/cards/:cardId/comments/:commentId/attachments', [requiresLogin, cardExists, listExists, hasCardInside, isCollaborator, (req, res) => {
    multerUpload(req, res, function (err) {
      if (err) {
        return res.status(500).send('Error: an error occured while uploading').end()
      }
      if (!req.files && !req.file) {
        return res.status(400).send('Error: expect files to upload').end()
      }
      controller.createAttachment(req).then(result => {
        cardController.refreshOneCard(req.params.boardId, req.params.listId, req.params.cardId).catch(err)
        return res.status(201).send(result)
      }).catch(err => {
        return res.status(500).send(err)
      })
    })
  }])
}
