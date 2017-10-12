const io = require('socket.io')()
const redis = require('socket.io-redis')

io.adapter(redis(process.env.REDIS_URL))

io.on('connection', (client) => {
  // here you can start emitting events to the client
  log('New connection')
  client.on('subscribeToBoard', (boardId) => {
    subscribeToBoard(client, boardId)
  })

  client.on('disconnect', client => {
    log('Client disconnected')
    leaveBoards(client)
  })
})

function subscribeToBoard (client, boardId) {
  io.of('/').adapter.remoteJoin(client.id, boardId, (err) => {
    if (err) { return console.error(err) }
    log('User subscribed to REDIS')
    getUsersInBoard(boardId).then(users => {
      log(`REDIS USERS ON BOARD ${boardId}: ${users}`)
    }).catch(err => {
      return console.error(err)
    })
    // success
  })
}

/* function unsubscribeToBoard (client, boardId) {
  io.of('/').adapter.removeLeave(client.id, boardId, err => {
    if (err) { return console.error(err) }
    // Process
  })
} */

function leaveBoards (client) {
  io.of('/').adapter.remoteDisconnect(client.id, true, (err) => {
    if (err) { return console.error(err) }
    log(`REDIS CLIENT LEFT`)
    // success
  })
}

function getUsersInBoard (boardId) {
  return new Promise((resolve, reject) => {
    io.of('/').adapter.clients(boardId, (err, clients) => {
      if (err) { return reject(new Error(`Error getting users in board ${boardId}`)) }
      return resolve(clients)
    })
  })
}

const port = 8000
io.listen(port)
console.log('Socket.io listening on port ', port)

function log (message) {
  console.log(`[SOCKETS]: ${message}`)
}

module.exports.emit = function emit (boardId, event, object) {
  io.to(boardId).emit(event, object)
  /* getUsersInBoard(boardId).then(clients => {
    log('Broadcasting new object')
    clients.emit(event, object)
  }) */
}
