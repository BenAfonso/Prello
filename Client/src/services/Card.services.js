import axios from 'axios'
import Config from '../config'
import { updateCardAction } from '../store/actions'

export function moveCard (boardId, cardId, oldListId, newListId, position) {
  axios.put(`${Config.API_URL}/boards/${boardId}/cards/${cardId}/move`, {
    oldListId: oldListId,
    newListId: newListId,
    position: position
  })
}

export function addMemberDistant (boardId, listId, cardId, email) {
  axios.post(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}/collaborator`, {
    email: email
  })
}

export function removeMemberDistant (boardId, listId, cardId, email) {
  axios.delete(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}/collaborator`, {
    email: email
  })
}

export function updateResponsibleDistant (boardId, listId, cardId, email) {
  axios.put(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}/responsible`, {
    email: email
  })
}

export function addComment (boardId, listId, cardId, content) {
  axios.post(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}/comments`, {
    text: content,
    createdAt: new Date()
  })
}

export function updateCardDescription (boardId, listId, cardId, card) {
  axios.put(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}`, {description: card.description})
}

export function getCompleteCard (boardId, listId, cardId) {
  axios.get(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}`).then(res => {
    updateCardAction(listId, res.data)
  })
}

export function updateCard (boardId, listId, cardId, card) {
  axios.put(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}`, card)
}
