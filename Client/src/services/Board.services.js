import Config from '../config'
import axios from 'axios'

export function addBoardDistant (payload) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/boards`, {
      title: payload.title,
      background: payload.color
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function fetchBoards () {
  return new Promise((resolve, reject) => {
    axios.get(`${Config.API_URL}/me/boards`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function getBoardHistory (boardId) {
  return new Promise((resolve, reject) => {
    axios.get(`${Config.API_URL}/boards/${boardId}/history?limit=20&skip=0`).then(res => {
      console.log(res.data)
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function addCollaborators (board, emails) {
  return new Promise((resolve, reject) => {
  })
}

export function addCollaboratorDistant (board, email) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/boards/${board}/collaborators`, {
      email: email
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function removeCollaboratorDistant (board, userId) {
  return new Promise((resolve, reject) => {
    axios.delete(`${Config.API_URL}/boards/${board}/collaborators/${userId}`).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function importTrelloBoardDistant (board) {
  axios.post(`${Config.API_URL}/boards/import`, board)
}
