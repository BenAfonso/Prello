const boardController = require('./boardController')
const listController = require('./listController')
const cardController = require('./cardController')
const userController = require('./userController')
const commentController = require('./commentController')
const attachmentController = require('./attachmentController')
const checklistController = require('./checklistController')
const teamController = require('./teamController')
const analyticsController = require('./analyticsController')

module.exports = {
  boardController: boardController,
  listController: listController,
  cardController: cardController,
  userController: userController,
  commentController: commentController,
  attachmentController: attachmentController,
  checklistController: checklistController,
  teamController: teamController,
  analyticsController: analyticsController
}
