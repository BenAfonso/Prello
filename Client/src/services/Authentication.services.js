import axios from 'axios'
import Config from '../config'
import { setConnectedUser } from '../store/actions'
import qs from 'qs'

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
export function loginPrello (code) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/oauth/token`, qs.stringify({
      grant_type: 'authorization_code',
      code: code
    }), { headers: {
      'authorization': 'Basic M2I1Njk2YTJmMGM4Zjc2N2ViMzQ6OWEzOTA0Mjg0ZGViMDJlMzJmZGY='
    }}).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      console.error(err)
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
