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
    axios.get(`${Config.API_URL}/analytics/boards`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function fetchBoardAnalytics (provider, boardId, per, dateFrom, dateTo) {
  console.log(boardId)
  return new Promise((resolve, reject) => {
    axios.get(`${Config.API_URL}/analytics/boards/${boardId}?per=${per}${provider ? `&provider=${provider}` : ''}${dateFrom ? `&from=${dateFrom}` : ''}${dateTo ? `&to=${dateTo}` : ''}`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function fetchListsAnalytics (provider, boardId, per, dateFrom, dateTo) {
  return new Promise((resolve, reject) => {
    axios.get(`${Config.API_URL}/analytics/boards/${boardId}/lists?per=${per}${provider ? `&provider=${provider}` : ''}${dateFrom ? `&from=${dateFrom}` : ''}${dateTo ? `&to=${dateTo}` : ''}`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function fetchUsersAnalytics (provider, boardId, per, dateFrom, dateTo) {
  return new Promise((resolve, reject) => {
    axios.get(`${Config.API_URL}/analytics/boards/${boardId}/members?per=${per}${provider ? `&provider=${provider}` : ''}${dateFrom ? `&from=${dateFrom}` : ''}${dateTo ? `&to=${dateTo}` : ''}`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
