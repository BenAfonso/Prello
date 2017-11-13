import axios from 'axios'
import Config from '../config'

export function createOAuthClient (name, redirectUri, scope) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/oauth/clients`, {
      name: name,
      redirectUris: [redirectUri],
      grant_type: 'authorization_code',
      scope: scope
    }).then(res => {
      resolve(res.data)
    })
  })
}

export function getOAuthClients () {
  return new Promise((resolve, reject) => {
    axios.get(`${Config.API_URL}/oauth/clients`).then(res => {
      console.log(res.data)
      resolve(res.data)
    })
  })
}
export function deleteOAuthClient (id) {
}

export function updateOAuthClient (name, redirectUri) {
}
