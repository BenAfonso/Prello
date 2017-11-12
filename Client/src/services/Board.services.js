import Config from '../config'
import axios from 'axios'
import { addListDistant } from './List.services'

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

export function addScrumBoardDistant (payload) {
  return new Promise((resolve, reject) => {
    addBoardDistant(payload)
      .then(board => {
        addListDistant(board._id, 'Product Backlog').then(list => {
          addListDistant(board._id, 'TO DO').then(list => {
            addListDistant(board._id, 'WIP').then(list => {
              addListDistant(board._id, 'Review').then(list => {
                for (let i = 1; i <= payload.sprints; i++) { // How to do it on a functional way ?
                  addListDistant(board._id, `Sprint n°${i}`)
                }
              })
            })
          })
        })
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
