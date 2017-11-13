import Config from '../config'
import axios from 'axios'

export function addBoardDistant (payload) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/boards`, {
      title: payload.title,
      background: payload.color
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function addTeamBoardDistant (payload) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/boards`, {
      title: payload.title,
      background: payload.color,
      teams: payload.teams
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function updateBoardNameDistant (boardId, boardName) {
  return new Promise((resolve, reject) => {
    axios.put(`${Config.API_URL}/boards/${boardId}`, {
      title: boardName
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function fetchBoards () {
  return new Promise((resolve, reject) => {
    axios.get(`${Config.API_URL}/me/boards`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function getBoardHistory (boardId) {
  return new Promise((resolve, reject) => {
    axios.get(`${Config.API_URL}/boards/${boardId}/history?limit=20&skip=0`).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function addCollaborators (board, emails) {
  return new Promise((resolve, reject) => {
  })
}

export function addCollaboratorDistant (board, email) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/boards/${board}/collaborators`, {
      email: email
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function removeCollaboratorDistant (board, userId) {
  return new Promise((resolve, reject) => {
    axios.delete(`${Config.API_URL}/boards/${board}/collaborators/${userId}`).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function addTeamToBoardDistant (boardId, teamId) {
  return new Promise((resolve, reject) => {
    axios.post(`${Config.API_URL}/boards/${boardId}/teams`, {
      teamId: teamId
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function removeTeamFromBoardDistant (boardId, teamId) {
  return new Promise((resolve, reject) => {
    axios.delete(`${Config.API_URL}/boards/${boardId}/teams/${teamId}`).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
