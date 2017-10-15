import axios from 'axios'
import Config from '../config'

export function moveCard (boardId, cardId, oldListId, newListId, position) {
  axios.put(`${Config.API_URL}/boards/${boardId}/cards/${cardId}/move`, {
    oldListId: oldListId,
    newListId: newListId,
    position: position
  })
}
