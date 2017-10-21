import Config from '../config'
import axios from 'axios'

export function addBoardDistant (payload) {
  return new Promise((resolve, reject) => {
    console.log(payload.color)
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

export function addCollaborators (board, emails) {
  return new Promise((resolve, reject) => {
    // Not implementeted
  })
}

export function addCollaborator (board, email) {
  return new Promise((resolve, reject) => {
    // Not implementeted
  })
}
