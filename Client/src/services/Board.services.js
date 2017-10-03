import axios from 'axios'
import Config from '../config'

export function fetchBoard () {
  return new Promise((resolve, reject) => {
    axios.get(`${Config.API_URL}/boards`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
