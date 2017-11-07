import axios from 'axios'
import Config from '../config'

export function addTeamDistant (teamName) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/teams`, {
      name: teamName
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function fetchTeams () {
  return new Promise((resolve, reject) => {
    axios.get(`${Config.API_URL}/me/teams`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function addTeamMemberDistant (team, email) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/teams/${team}/collaborators`, {
      email: email
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function removeTeamMemberDistant (team, userId) {
  return new Promise((resolve, reject) => {
    axios.delete(`${Config.API_URL}/teams/${team}/collaborators/${userId}`).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
