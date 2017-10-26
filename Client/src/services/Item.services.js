import axios from 'axios'
import Config from '../config'

export function addItem (boardId, listId, cardId, checklistId, content) {
  axios.post(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}/checklists/${checklistId}/items`, {
    text: content,
    isChecked: false
  })
}

export function deleteItem (boardId, cardId, listId, checklistId, itemId) {
  axios.delete(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}/checklists/${checklistId}/items/${itemId}`)
}

export function updateItem (boardId, cardId, listId, checklistId, itemId, newContent, isChecked) {
  axios.put(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}/checklists/${checklistId}/items/${itemId}`, {
    text: newContent,
    isChecked: isChecked
  })
}
