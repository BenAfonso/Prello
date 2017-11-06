module.exports = (router, controller) => {
  require('./getAll')(router, controller)
  require('./createInBoard')(router, controller)
  require('./createInCard')(router, controller)
  require('./getFromCard')(router, controller)
  require('./getOne')(router, controller)
  require('./removeFromCard')(router, controller)
  require('./delete')(router, controller)
  require('./update')(router, controller)
  require('./updateFromCard')(router, controller)
}