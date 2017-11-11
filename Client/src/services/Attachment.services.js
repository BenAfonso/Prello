import axios from 'axios'
import Config from '../config'

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

export function deleteAttachment (boardId, attachmentId) {
  axios.delete(`${Config.API_URL}/boards/${boardId}/attachments/${attachmentId}`)
}
