process.env.NODE_ENV = 'test'

module.exports = function (server, chai) {
  require('./List/list.spec.js')(server, chai)
  require('./Board/board.spec.js')(server, chai)
  require('./Card/card.spec.js')(server, chai)
}
