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
  require('./addTeams')(router, controller)
  require('./removeTeams')(router, controller)
  require('./getHistory')(router, controller)
  require('./import')(router, controller)
}
