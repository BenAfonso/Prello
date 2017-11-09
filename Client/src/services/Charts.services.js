import axios from 'axios'
import Config from '../config'

export function getMembersAnalytics (boardId) {
  axios.get(`${Config.API_URL}/boards/${boardId}/analytics/members`).then(data =>
    console.log(data)
  )
}

export function getOwnersAnalytics (boardId) {
  axios.get(`${Config.API_URL}/boards/${boardId}/analytics/owners`).then(data =>
    console.log(data)
  )
}
