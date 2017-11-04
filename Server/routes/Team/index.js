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
}
