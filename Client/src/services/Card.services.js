import axios from 'axios'
import Config from '../config'
import { updateCard } from '../store/actions'

export function moveCard (boardId, cardId, oldListId, newListId, position) {
  axios.put(`${Config.API_URL}/boards/${boardId}/cards/${cardId}/move`, {
    oldListId: oldListId,
    newListId: newListId,
    position: position
  })
}

export function addComment (boardId, listId, cardId, content) {
  axios.post(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}/comments`, {
    text: content,
    createdAt: new Date()
  })
}

export function getCompleteCard (boardId, listId, cardId) {
  axios.get(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}`).then(res => {
    updateCard(listId, res.data)
  })
}
