import axios from 'axios'
import Config from '../config'

export function getMembersAnalytics (boardId) {
  axios.get(`${Config.API_URL}/boards/${boardId}/analytics/members`).then(data =>
    console.log(data)
  )
}

export function getResponsibleAnalytics (boardId) {
  axios.get(`${Config.API_URL}/boards/${boardId}/analytics/responsibles`).then(data =>
    console.log(data)
  )
}

export function getListsAnalytics (boardId) {
  axios.get(`${Config.API_URL}/boards/${boardId}/analytics/lists`).then(data =>
    console.log(data)
  )
}

export function getOverviewAnalytics (boardId) {
  axios.get(`${Config.API_URL}/boards/${boardId}/analytics/overview`).then(data =>
    console.log(data)
  )
}
