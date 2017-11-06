// const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
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
