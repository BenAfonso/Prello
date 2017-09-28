const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

require('./List')(router, controllers.listController)
require('./Board')(router, controllers.boardController)

router.get('/', (req, res) => {
  res.status(200).json('Welcome on Prello')
})

module.exports = router
