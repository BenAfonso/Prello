module.exports = (router, controller) => {
    /**
   * @swagger
   * definitions:
   *   Attachments:
   *     properties:
   *       name:
   *         type: string
   *       ext:
   *         type: String
   */
  require('./getAll')(router, controller)
  require('./createInBoard')(router, controller)
  require('./createInCard')(router, controller)
  require('./getFromCard')(router, controller)
  require('./getOne')(router, controller)
  require('./removeFromCard')(router, controller)
  require('./delete')(router, controller)
  require('./update')(router, controller)
  require('./updateFromCard')(router, controller)
  require('./updateFromComment')(router, controller)
}
