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
}
