import axios from 'axios'
import Config from '../config'

export function addLabel (boardId, labelTitle, labelColor) {
  axios.post(`${Config.API_URL}/boards/${boardId}/labels`, {
    name: labelTitle,
    color: labelColor
  })
}

export function getBoardLabels (boardId) {
  axios.get(`${Config.API_URL}/boards/${boardId}/labels`)
}

export function deleteLabel (boardId, labelId) {
  axios.delete(`${Config.API_URL}/boards/${boardId}/labels/${labelId}`)
}

export function updateLabel (boardId, labelId, labelTitle, labelColor) {
  axios.put(`${Config.API_URL}/boards/${boardId}/labels/${labelId}`, {
    name: labelTitle,
    color: labelColor
  })
}

export function addCardLabel (boardId, listId, cardId, labelId) {
  axios.post(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}/label`, {
    labelId: labelId
  })
}

export function deleteCardLabel (boardId, listId, cardId, labelId) {
  axios.delete(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}/labels/${labelId}`)
}
