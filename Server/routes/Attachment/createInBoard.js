const {requiresLogin} = require('../../config/middlewares/authorization')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')
const multer = require('multer')
const multerUpload = multer({storage: multer.memoryStorage()}).any()
module.exports = (router, controller) => {
  /**
    * @swagger
    * /boards/{boardId}/attachments:
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
  router.post('/boards/:boardId/attachments', [requiresLogin, isCollaborator, (req, res) => {
    multerUpload(req, res, function (err) {
      if (err) {
        return res.status(500).send('Error: an error occured while uploading').end()
      }
      if (!req.files && !req.file) {
        return res.status(400).send('Error: expect files to upload').end()
      }
      controller.createAttachment(req).then(result => {
        return res.status(201).send(result)
      }).catch(err => {
        return res.status(500).send(err)
      })
    })
  }])
}
