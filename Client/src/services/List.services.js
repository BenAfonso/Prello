import axios from 'axios'
import Config from '../config'

export function addListDistant (boardId, listName) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/boards/${boardId}/lists`, {
      name: listName
    }).then((res) => {
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
      console.log(res)
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
