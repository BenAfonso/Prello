process.env.NODE_ENV = 'test'

module.exports = function (server, chai) {
  require('./List/list.spec.js')(server, chai)
}
