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
  axios.get(`${Config.API_URL}/boards/${boardId}/attachments/${attachment._id}.${attachment.ext}`).then(res => {
    let image = new Image()
    const name = `${attachment.name}`
    image.src = res.data
    let newWindow = window.open()
    let canvas = newWindow.document.createElement('canvas')
    let context = canvas.getContext('2d')
    context.drawImage(image, 0, 0)
    console.log(canvas)
    canvas.toBlob(blob => {
      FileSaver.saveAs(blob, name)
    }, 'image/png')
  })
}

export function deleteAttachment (boardId, attachmentId) {
  axios.delete(`${Config.API_URL}/boards/${boardId}/attachments/${attachmentId}`)
}
