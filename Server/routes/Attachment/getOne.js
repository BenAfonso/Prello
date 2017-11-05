// const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
  router.get('/boards/:boardId/attachments/:attachmentId', [requiresLogin, isCollaborator], (req, res) => {
    controller.getFile(req).then(result => {
      return res.status(200).send(result)
    }).catch(err => {
      return res.status(500).send(err)
    })
  })
}
