// const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
    /**
    * @swagger
    * /boards/{boardId}/attachments/{attachmentId}:
    *   get:
    *     tags:
    *       - Attachments
    *     description: Get One attachment in a board
    *     summary: Get One attachment in a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to get One the attachment
    *         in: path
    *         required: true
    *       - name: attachmentId
    *         type: string
    *         description: The attachment we want to retrieve
    *         in: path
    *         required: true
    *     responses:
    *       200:
    *         description: The attachment
    *         schema:
    *           $ref: '#/definitions/Attachment'
    *       500:
    *         description: Internal error
    */
  router.get('/boards/:boardId/attachments/:attachmentId', [requiresLogin, isCollaborator], (req, res) => {
    controller.getFile(req, res).then(pipe => {
      // Handled in service
    }).catch(err => {
      console.error(err)
      return res.status(500).send(err)
    })
  })
}
