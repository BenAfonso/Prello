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
