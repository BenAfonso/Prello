// const Util = require('../../controllers/Util')
const {requiresLogin} = require('../../config/middlewares/authorization')
const {isCollaborator} = require('../../config/middlewares/boardAuthorizations')

module.exports = (router, controller) => {
  router.get('/boards/:boardId/attachments', [requiresLogin, isCollaborator], (req, res) => {
    res.status(200).send('Not implemented yet')
  })
}
