// const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
    /**
    * @swagger
    * /boards/{boardId}/attachments/{attachmentId}:
    *   put:
    *     tags:
    *       - Attachments
    *     description: Update an attachment in a board
    *     summary: Update an attachment in a Board
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: boardId
    *         type: string
    *         description: The board id where we want to update the attachment
    *         in: path
    *         required: true
    *       - name: attachmentId
    *         type: string
    *         description: The attachment id where we want to update the attachment
    *         in: path
    *         required: true
    *       - name: body
    *         description: The attachment object that needs to be update
    *         in: body
    *         required: true
    *         schema:
    *             $ref: '#/definitions/Attachment'
    *     responses:
    *       200:
    *         description: Message confirming the attachment has been updated
    *       500:
    *         description: Internal error
    */
  router.put('/boards/:boardId/attachments/:attachmentId', [requiresLogin, isCollaborator], (req, res) => {
    if (req.body.name === undefined) {
      res.status(400).send('Missing name')
    }
    controller.updateAttachment(req.params.boardId, req.params.attachmentId, req.body.name).then(result => {
      res.status(200).send(result)
    }).catch(err => {
      res.status(500).send(err)
    })
  })
}
