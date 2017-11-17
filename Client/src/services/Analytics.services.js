import Config from '../config'
import axios from 'axios'

export function getBaseUrl (provider) {
  switch (provider) {
    case 'TheMightyPrello':
      return Config.API_URL
    default:
      return undefined
  }
}

export function fetchBoards (provider) {
  return new Promise((resolve, reject) => {
    let base = getBaseUrl('TheMightyPrello')
    axios.get(`${base}/me/boards`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function fetchBoardAnalytics (provider, boardId, per, dateFrom, dateTo) {
  return new Promise((resolve, reject) => {
    let base = getBaseUrl('TheMightyPrello')
    axios.get(`${base}/analytics/boards/${boardId}?per=${per}&from=${dateFrom}&to=${dateTo}`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function fetchListsAnalytics (provider, boardId, per, dateFrom, dateTo) {
  return new Promise((resolve, reject) => {
    let base = getBaseUrl('TheMightyPrello')
    axios.get(`${base}/analytics/boards/${boardId}/lists?per=${per}`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function fetchUsersAnalytics (provider, boardId, per, dateFrom, dateTo) {
  return new Promise((resolve, reject) => {
    let base = getBaseUrl('TheMightyPrello')
    axios.get(`${base}/analytics/boards/${boardId}/members?per=${per}`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
