// const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
  router.delete('/boards/:boardId/attachments/:attachmentId', [requiresLogin, isCollaborator], (req, res) => {
    controller.deleteAttachment(req).then(result => {
      res.status(200).send('Attachment removed')
    }).catch(err => {
      res.status(500).send(err)
    })
  })
}
