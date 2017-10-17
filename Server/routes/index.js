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

router.get('/me/*', [requiresLogin], (req, res) => {
  let request = req.originalUrl.split('/').filter(e => e !== '')
  request[0] = `/users/${req.user._id}`
  res.redirect(request.join('/'))
})

require('./List')(router, controllers)
require('./Board')(router, controllers.boardController)
require('./Card')(router, controllers.cardController)
require('./User')(router, controllers.userController)

router.get('/', (req, res) => {
  res.status(200).json('Welcome on Prello')
})

module.exports = router
