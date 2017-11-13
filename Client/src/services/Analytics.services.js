import Config from '../config'
import axios from 'axios'

export function getBaseUrl (provider) {
  switch (provider) {
    case 'TheMightyPrello':
      return Config.API_URL
    default:
      return undefined
  }
}

export function fetchBoards (provider) {
  return new Promise((resolve, reject) => {
    let base = getBaseUrl('TheMightyPrello')
    axios.get(`${base}/me/boards`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
