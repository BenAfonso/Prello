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
  let opts = {}
  opts.responseType = 'blob' // <--- force blob at the beginning, anyway
  let url = `${Config.API_URL}/boards/${boardId}/attachments/${attachment._id}.${attachment.ext}`
  axios.get(url, opts).then(res => {
    console.log(res)
    let resBlob = res.data // <--- store the blob if it is
    FileSaver.saveAs(resBlob, `${attachment._id}.${attachment.ext}`)
    try {
      let resData = null
      let resText = new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.addEventListener('abort', reject)
        reader.addEventListener('error', reject)
        reader.addEventListener('loadend', () => {
          resolve(reader.result)
        })
        reader.readAsText(resBlob)
      })
      resData = JSON.parse(resText) // <--- try to parse as json evantually
      console.log(resData)
    } catch (err) {
      // ignore
    }
  })

  /* axios.get(`${Config.API_URL}/boards/${boardId}/attachments/${attachment._id}.${attachment.ext}`).then(res => {
    console.log(res)
  )} */
}

export function deleteAttachment (boardId, attachmentId) {
  axios.delete(`${Config.API_URL}/boards/${boardId}/attachments/${attachmentId}`)
}
