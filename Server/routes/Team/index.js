module.exports = (router, controller) => {
  /**
   * @swagger
   * definitions:
   *   Team:
   *     properties:
   *       name:
   *         type: string
   */
  require('./create')(router, controller)
  require('./addCollaborator')(router, controller)
  require('./removeCollaborator')(router, controller)
  require('./update')(router, controller)
  require('./getOneTeam')(router, controller)
  require('./setAdmin')(router, controller)
  require('./unsetAdmin')(router, controller)
  require('./removeAdmin')(router, controller)
}
