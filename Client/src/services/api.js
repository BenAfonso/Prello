import openSocket from 'socket.io-client'
import {addBoardLocal, addListLocal, removeListLocal, moveListLocal, addCardLocal, moveCardLocal, addCollaboratorLocal} from '../store/actions'
import Config from '../config'
const socket = openSocket(Config.SOCKET_URL)

export function subscribeToBoard (board) {
  socket.emit('subscribeToBoard', board._id)
}

export function subscribeToBoardslist (userId) {
  socket.emit('subscribeToBoardslist', userId)
}

socket.on('NEW_BOARD', (board) => {
  addBoardLocal(board)
})

socket.on('NEW_LIST', (list) => {
  addListLocal(list)
})

socket.on('REMOVE_LIST', (list) => {
  removeListLocal(list)
})

socket.on('LIST_MOVED', (lists) => {
  moveListLocal(lists)
})
socket.on('CARD_MOVED', (lists) => {
  moveCardLocal(lists)
})

socket.on('NEW_CARD', (newCard) => {
  addCardLocal(newCard.listId, newCard.card)
})

socket.on('CARD_UPDATED', (newCard) => {

})

/* socket.on('ADD_COLLABORATOR', (user) => {
  addCollaboratorLocal(user)
}) */
