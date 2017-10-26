import Config from '../config'
import axios from 'axios'

export function fetchMatchingUsersEmail (email) {
  return new Promise((resolve, reject) => {
    axios.get(`${Config.API_URL}/users`, {
      params: {
        email: email,
        limit: 5,
        skip: 25
      }
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
