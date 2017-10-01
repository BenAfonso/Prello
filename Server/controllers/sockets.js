const io = require('socket.io')()

io.on('connection', (client) => {
  // here you can start emitting events to the client
  console.log('new client')
  client.on('subscribeToBoard', (boardId) => {
    console.log('client is subscribing to board', boardId)
  })
})

const port = 8000
io.listen(port)
console.log('Socket.io listening on port ', port)
