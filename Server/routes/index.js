const express = require('express')
const router = express.Router()

const controllers = require('../controllers')
router.get('/', (req, res) => {
  res.status(200).json('Welcome on Prello')
})
router.get('/boards', controllers.boardController.getAllBoards)
router.post('/board', controllers.boardController.createBoard)
router.post('/boards/:id/lists', controllers.listController.createList)

module.exports = router
