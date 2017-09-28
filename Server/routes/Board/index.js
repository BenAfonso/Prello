module.exports = function (router, controller) {
  require('./getAll')(router, controller)
  require('./create')(router, controller)
}
