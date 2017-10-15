import axios from 'axios'
import Config from '../config'
import { authGet } from './Authentication.services'

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
    authGet(`${Config.API_URL}/boards`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
