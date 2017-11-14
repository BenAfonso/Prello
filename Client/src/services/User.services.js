import Config from '../config'
import axios from 'axios'

export function fetchUser (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${Config.API_URL}/users/${id}`)
      .then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
  })
}

export function fetchUserTeams (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${Config.API_URL}/users/${id}/teams`)
      .then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
  })
}

export function fetchUserBoards (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${Config.API_URL}/users/${id}/boards`)
      .then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
  })
}

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
    axios.put(`${Config.API_URL}/me/`, datas).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
