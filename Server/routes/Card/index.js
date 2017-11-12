module.exports = (router, controller) => {
  /**
  * @swagger
  * definitions:
  *   Card:
  *     properties:
  *       name:
  *         type: string
  */
  require('./create')(router, controller)
  require('./moveCard')(router, controller)
  require('./delete')(router, controller)
  require('./update')(router, controller)
  require('./getOne')(router, controller)
  require('./addCollaborator')(router, controller)
  require('./addLabel')(router, controller)
  require('./removeLabel')(router, controller)
  require('./removeCollaborator')(router, controller)
  require('./removeResponsible')(router, controller)
  require('./updateResponsible')(router, controller)
}
