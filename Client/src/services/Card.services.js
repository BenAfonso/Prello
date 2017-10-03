import axios from 'axios'
import Config from '../config'

export function moveCard (card, originalListId, newListId) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/boards/${card.id}`, {
      name: card.content
    }).then((res) => {
      axios.delete(`${Config.API_URL}/boards/${card.id}`).then((res) => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    }).catch(err => {
      reject(err)
    })
  })
}
