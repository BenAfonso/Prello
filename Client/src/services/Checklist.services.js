import axios from 'axios'
import Config from '../config'

export function addChecklist (boardId, listId, cardId, title) {
  axios.post(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}/checklists`, {
    text: title
  })
}

export function deleteChecklist (boardId, listId, cardId, checklistId) {
  axios.delete(`${Config.API_URL}/boards/${boardId}/cards/${cardId}/checklists/${checklistId}`)
}

export function updateChecklist (boardId, listId, cardId, checklistId, newTitle) {
  axios.put(`${Config.API_URL}/boards/${boardId}/cards/${cardId}/checklists/${checklistId}`, {
    text: newTitle
  })
}
