module.exports = (router, controllers) => {
  /**
  * @swagger
  * definitions:
  *   Label:
  *     properties:
  *       name:
  *         type: string
  *       color:
  *         type: string
  */
  require('./create')(router, controllers.boardController)
  require('./delete')(router, controllers.boardController)
  require('./update')(router, controllers.boardController)
}
