const express = require('express')
const router = express.Router()
const controllers = require('../controllers')
const { requiresLogin } = require('../config/middlewares/authorization')
   /**
     * @swagger
     * definitions:
     *   Geometry:
     *     required:
     *       - name
     *     properties:
     *       type:
     *         type: string
     *         enum: ['Polygon','Point']
     *       coordinates:
     *         type: array
     *         items:
     *           type: number
     */

router.get('/me/*', [requiresLogin], (req, res, next) => {
  let request = req.originalUrl.split('/').filter(e => e !== '')
  request[0] = `/users/${req.user._id}`
  request = request.join('/')
  req.url = request
  next()
})

require('./List')(router, controllers)
require('./Board')(router, controllers.boardController)
require('./Card')(router, controllers.cardController)
require('./User')(router, controllers.userController)
require('./Comment')(router, controllers.commentController)
require('./Attachment')(router, controllers.attachmentController)
require('./Checklist')(router, controllers.checklistController)

router.get('/', (req, res) => {
  res.redirect('/api-docs')
})

module.exports = router
