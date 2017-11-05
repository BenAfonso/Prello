// const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
  router.get('/boards/:boardId/attachments/:attachmentId', [requiresLogin, isCollaborator], (req, res) => {
    controller.getFile(req).then(result => {
      res.setHeader('Content-type', result.mimetype)
      return res.status(200).send(result.buffer)
    }).catch(err => {
      return res.status(500).send(err)
    })
  })
}
