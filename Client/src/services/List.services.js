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
