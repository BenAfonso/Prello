import Config from '../config'
import axios from 'axios'

export function addBoardDistant (boardTitle) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/boards`, {
      title: boardTitle
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
      console.log(res.data)
      resolve(res.data)
    }).catch((err) => {
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
