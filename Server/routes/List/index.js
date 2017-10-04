module.exports = (router, controller) => {
  /**
  * @swagger
  * definitions:
  *   List:
  *     properties:
  *       name:
  *         type: string
  */
  require('./create')(router, controller)
  require('./delete')(router, controller)
  require('./update')(router, controller)
  require('./moveList')(router, controller)
}
