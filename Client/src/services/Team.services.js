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
