import axios from 'axios'
import Config from '../config'

export function storeToken (token) {
  window.localStorage.setItem('prello_access_token', token)
}

export function extractToken () {
  return window.localStorage.getItem('prello_access_token')
}

export function isAuthenticated () {
  return (window.localStorage.getItem('prello_access_token') !== undefined &&
    window.localStorage.getItem('prello_access_token') !== null)
}

export function removeToken () {
  window.localStorage.removeItem('prello_access_token')
}

// TODO: Use app state to make it??
export function logout () {
  removeToken()
  window.location = '/login'
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

export function authGet (url) {
  return new Promise((resolve, reject) => {
    if (isAuthenticated()) {
      axios.get(url, {
        headers: { 'authorization': `Bearer ${extractToken()}` }
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    } else {
      logout()
      reject(new Error('Not logged in'))
    }
  })
}

export function authPost (url, body) {
  return new Promise((resolve, reject) => {
    if (isAuthenticated()) {
      axios.post(url, body, {
        headers: { 'authorization': `Bearer ${extractToken()}` }
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    } else {
      logout()
      reject(new Error('Not logged in'))
    }
  })
}

export function authPut (url, body) {
  return new Promise((resolve, reject) => {
    if (isAuthenticated()) {
      axios.put(url, body, {
        headers: { 'authorization': `Bearer ${extractToken()}` }
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    } else {
      logout()
      reject(new Error('Not logged in'))
    }
  })
}

export function authDelete (url) {
  return new Promise((resolve, reject) => {
    if (isAuthenticated()) {
      axios.delete(url, {
        headers: { 'authorization': `Bearer ${extractToken()}` }
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    } else {
      logout()
      reject(new Error('Not logged in'))
    }
  })
}