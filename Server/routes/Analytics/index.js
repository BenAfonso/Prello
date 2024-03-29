module.exports = function (router, controller) {
  require('./boardAnalytics')(router, controller)
  require('./listsAnalytics')(router, controller)
  require('./cardsAnalytics')(router, controller)
  require('./membersAnalytics')(router, controller)
  require('./userBoards')(router, controller)
}
