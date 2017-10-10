import axios from 'axios'
import Config from '../config'

export function addListDistant (boardId, listName) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/boards/${boardId}/lists`, {
      name: listName
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function postCard (listId, content) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/lists/${listId}/cards`, {
      text: content
    }).then(res => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function moveListDistant (boardId, listId, position) {
  return new Promise((resolve, reject) => {
    axios.put(`${Config.API_URL}/boards/${boardId}/lists/${listId}/move`, {
      position: position
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

// TODO: Remove this in next versions
export function deleteList (boardId, listId) {
  return new Promise((resolve, reject) => {
    axios.delete(`${Config.API_URL}/boards/${boardId}/lists/${listId}`)
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
  })
}
