import openSocket from 'socket.io-client'
import { addListLocal, removeListLocal, moveListLocal } from '../store/actions'
import Config from '../config'
console.log(process.env)
const socket = openSocket(Config.SOCKET_URL)

export function subscribeToBoard (board) {
  socket.emit('subscribeToBoard', board._id)
}

socket.on('NEW_LIST', (list) => {
  addListLocal(list)
})

socket.on('REMOVE_LIST', (list) => {
  removeListLocal(list)
})

socket.on('LIST_MOVED', (lists) => {
  moveListLocal(lists)
})

socket.on('CARD_UPDATED', (newCard) => {

})
