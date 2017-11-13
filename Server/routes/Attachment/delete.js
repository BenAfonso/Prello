// const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
    /**
    * @swagger
    * /boards/{boardId}/attachments/{attachmentId}:
    *   delete:
    *     tags:
    *       - Attachments
    *     description: Delete an attachment in a board
    *     summary: Delete an attachment in a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to remove the attachment
    *         in: path
    *         required: true
    *       - name: attachmentId
    *         type: string
    *         description: The board id where we want to remove the attachment
    *         in: path
    *         required: true
    *     responses:
    *       200:
    *         description: Message confirming the attachment has been removed
    *       500:
    *         description: Internal error
    */
  router.delete('/boards/:boardId/attachments/:attachmentId', [requiresLogin, isCollaborator], (req, res) => {
    controller.deleteAttachment(req).then(result => {
      res.status(200).send('Attachment removed')
    }).catch(err => {
      res.status(500).send(err)
    })
  })
}
