import openSocket from 'socket.io-client'
import { addListLocal, removeListLocal, moveListLocal } from '../store/actions'
const socket = openSocket('http://localhost:8000')

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
