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
  require('./delete')(router, controller)
  require('./update')(router, controller)
}
