const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

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
require('./List')(router, controllers)
require('./Board')(router, controllers.boardController)
require('./Card')(router, controllers.cardController)
require('./User')(router, controllers.userController)

router.get('/', (req, res) => {
  res.status(200).json('Welcome on Prello')
})

module.exports = router
