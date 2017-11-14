import axios from 'axios'
import Config from '../config'
import FileSaver from 'file-saver'

export function addAttachmentComment (boardId, listId, cardId, commentId) {
  axios.post(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}/comments/${commentId}/attachments`, {
    // F
  })
}

export function addAttachmentCard (boardId, listId, cardId) {
  axios.post(`${Config.API_URL}/boards/${boardId}/lists/${listId}/cards/${cardId}/attachments`, {
    // F
  })
}

export function getAttachment (boardId, attachment) {
  if (!(boardId && attachment)) { return }
  let url = `${Config.API_URL}/boards/${boardId}/attachments/${attachment._id}.${attachment.ext}`
  return new Promise((resolve, reject) => {
    axios.get(url, { responseType: 'blob' }).then(res => {
      resolve(URL.createObjectURL(res.data))
    }).catch(err => (
      console.error(err)
    ))
  })
}

export function downloadAttachment (boardId, attachment) {
  if (!(boardId && attachment)) { return }
  let url = `${Config.API_URL}/boards/${boardId}/attachments/${attachment._id}.${attachment.ext}`
  axios.get(url, { responseType: 'blob' }).then(res => {
    FileSaver.saveAs(res.data, `${attachment._id}.${attachment.ext}`)
  }).catch(err => (
    console.error(err)
  ))
}

export function deleteAttachment (boardId, attachmentId) {
  return axios.delete(`${Config.API_URL}/boards/${boardId}/attachments/${attachmentId}`)
}
