module.exports = function (router, controller) {
  /**
   * @swagger
   * definitions:
   *   Board:
   *     properties:
   *       name:
   *         type: string
   *       background:
   *         type: String
   */

  require('./getAll')(router, controller)
  require('./create')(router, controller)
  require('./getOne')(router, controller)
  require('./addCollaborator')(router, controller)
  require('./removeCollaborator')(router, controller)
  require('./getUserBoards')(router, controller)
}
