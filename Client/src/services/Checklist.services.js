import axios from 'axios'
import Config from '../config'

export function addChecklist (boardId, listId, cardId, title) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}/checklists`, {
      text: title
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function deleteChecklist (boardId, listId, cardId, checklistId) {
  return new Promise((resolve, reject) => {
    axios.delete(`${Config.API_URL}/boards/${boardId}/cards/${cardId}/checklists/${checklistId}`)
      .then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
  })
}

export function updateChecklist (boardId, listId, cardId, checklistId, newTitle) {
  return new Promise((resolve, reject) => {
    axios.put(`${Config.API_URL}/boards/${boardId}/cards/${cardId}/checklists/${checklistId}`, {
      text: newTitle
    })
      .then(res => {
        resolve(res.data)
      }).catch(err => {
        resolve(err)
      })
  })
}
