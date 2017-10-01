import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:8000')

export function subscribeToBoard () {
  socket.emit('subscribeToBoard', 1)
}
