import axios from 'axios'
import Config from '../config'

export function storeToken (token) {
  window.localStorage.setItem('token', token)
}

export function extractToken () {
  window.localStorage.getItem('token')
}

export function isAuthenticated () {
  return window.localStorage.getItem('token') !== undefined
}

export function login (email, password) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/login`, {
      email: email,
      password: password
    })
    .then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function register (name, email, password, withLogin) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/register${withLogin ? '?withLogin=true' : ''}`)
    .send({
      email: email,
      name: name,
      username: name.split(' ').join(''),
      password: password
    })
    .then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
