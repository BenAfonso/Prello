import axios from 'axios'
import Config from '../config'

export function getDoneCardsMembers (boardId) {
  axios.get(`${Config.API_URL}/boards/${boardId}/analytics/doneCardsMembers`).then(data =>
    console.log(data)
  )
}
