import Config from '../config'
import { authGet } from './Authentication.services'

export function fetchBoard () {
  return new Promise((resolve, reject) => {
    authGet(`${Config.API_URL}/boards`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
