module.exports = function (router, controller) {
  require('./boardAnalytics')(router, controller)
  require('./listsAnalytics')(router, controller)
  require('./cardsAnalytics')(router, controller)
}
