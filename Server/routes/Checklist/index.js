module.exports = (router, controller) => {
  /**
  * @swagger
  * definitions:
  *   Checklist:
  *     properties:
  *       text:
  *         type: string
  *   Item:
  *     properties:
  *       text:
  *         type: string
  *       isChecked:
  *         type: boolean
  */
  require('./create')(router, controller)
  require('./update')(router, controller)
  require('./delete')(router, controller)
  require('./createItem')(router, controller)
  require('./updateItem')(router, controller)
  require('./deleteItem')(router, controller)
}
