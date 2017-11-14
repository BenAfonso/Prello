import axios from 'axios'
import Config from '../config'
import { setConnectedUser } from '../store/actions'

export function storeToken (token) {
  window.localStorage.setItem('prello_access_token', token)
}

export function extractToken () {
  return window.localStorage.getItem('prello_access_token')
}

export function setProfile () {
  if (profileIsInLocalStorage()) {
    setConnectedUser(loadProfileFromLocalStorage())
  } else {
    fetchProfile().then(profile => {
      setConnectedUser(profile)
      storeProfileLocalStorage(profile)
    })
  }
}

export function isAuthenticated () {
  if (window.localStorage.getItem('prello_access_token') !== undefined &&
    window.localStorage.getItem('prello_access_token') !== null) {
    setTokenHeader()
    setProfile()
    return true
  } else {
    unsetTokenHeader()
    return false
  }
}
export function setTokenHeader () {
  axios.defaults.headers.common['authorization'] = `Bearer ${extractToken()}`
}
export function unsetTokenHeader () {
  axios.defaults.headers.common['authorization'] = null
}

export function removeToken () {
  window.localStorage.removeItem('prello_access_token')
}

export function logout () {
  removeToken()
  deleteProfileLocalStorage()
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
export function loginGoogle (code) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/auth/google/callback`, {
      code: code
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function register (name, email, password, withLogin) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/register${withLogin ? '?withLogin=true' : ''}`, {
      email: email,
      name: name,
      username: name.split(' ').join(''),
      password: password
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

const loadProfileFromLocalStorage = () => {
  return JSON.parse(window.localStorage.getItem('prello_profile'))
}

const storeProfileLocalStorage = (profile) => {
  window.localStorage.setItem('prello_profile', JSON.stringify(profile))
}

const deleteProfileLocalStorage = () => {
  window.localStorage.removeItem('prello_profile')
}

const profileIsInLocalStorage = () => (
  window.localStorage.getItem('prello_profile') !== undefined &&
  window.localStorage.getItem('prello_profile') !== null
)

const fetchProfile = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${Config.API_URL}/me/`).then(res => {
      resolve(res.data)
    })
  })
}
