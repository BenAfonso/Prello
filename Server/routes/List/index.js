module.exports = function (router, controller) {
    /**
   * @swagger
   * definitions:
   *   List:
   *     properties:
   *       name:
   *         type: string
   */
  require('./create')(router, controller)
}
