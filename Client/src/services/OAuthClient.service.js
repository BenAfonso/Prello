import axios from 'axios'
import Config from '../config'

export function createOAuthClient (name, redirectUri, scope) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/me/oauth/clients`, {
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
    axios.get(`${Config.API_URL}/me/oauth/clients`).then(res => {
      resolve(res.data)
    })
  })
}

export function deleteOAuthClient (clientId) {
  return new Promise((resolve, reject) => {
    axios.delete(`${Config.API_URL}/me/oauth/clients/${clientId}`).then(res => {
      resolve(res.data)
    })
  })
}

export function updateOAuthClient (client) {
  return new Promise((resolve, reject) => {
    axios.put(`${Config.API_URL}/me/oauth/clients/${client._id}`, client).then(res => {
      resolve(res.data)
    })
  })
}
