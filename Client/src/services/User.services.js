import Config from '../config'
import axios from 'axios'

export function fetchMatchingUsersEmail (email) {
  return new Promise((resolve, reject) => {
    axios.get(`${Config.API_URL}/users`, {
      params: {
        email: email,
        limit: 10,
        skip: 0
      }
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function updateProfile (datas) {
  return new Promise((resolve, reject) => {
    axios.put(`${Config.API_URL}/me/`, {
      name: datas.name,
      username: datas.username,
      picture: datas.picture,
      bio: datas.bio
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
