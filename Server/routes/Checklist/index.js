module.exports = (router, controller) => {
  /**
  * @swagger
  * definitions:
  *   Comment:
  *     properties:
  *       text:
  *         type: string
  */
  require('./create')(router, controller)
  require('./createItem')(router, controller)
  require('./updateItem')(router, controller)
  require('./removeItem')(router, controller)
}
