import { fetchBoards, addBoardDistant, addCollaboratorDistant, removeCollaboratorDistant } from '../services/Board.services'
import { addListDistant, postCard, deleteList, moveListDistant, updateList } from '../services/List.services'
import { moveCard, addMemberDistant, removeMemberDistant, updateCard, updateResponsibleDistant, removeResponsibleDistant } from '../services/Card.services'
import { fetchMatchingUsersEmail } from '../services/User.services'

import store from '../store/store'

export function addList (dispatch, boardId, name) {
  addListDistant(boardId, name)
    .then((list) => {
      // <= HANDLED FROM SOCKETS
    })
}

export function addListLocal (list) {
  if (list) {
    store.dispatch({
      type: 'ADD_LIST',
      payload: list
    })
  }
}

export function updateCardAction (listId, card) {
  store.dispatch({
    type: 'UPDATE_CARD',
    payload: {
      listId: listId,
      card: card
    }
  })
}

export function moveList (dispatch, boardId, listId, position) {
  moveListDistant(boardId, listId, position)
    .then((lists) => {
      // <= HANDLED FROM SOCKETS
    })
}

export function moveCardDistant (boardId, cardId, oldListId, newListId, position) {
  moveCard(boardId, cardId, oldListId, newListId, position)
}
export function moveCardLocal (list) {
  if (list) {
    store.dispatch({
      type: 'MOVE_CARD',
      payload: list
    })
  }
}

export function moveListLocal (list) {
  if (list) {
    store.dispatch({
      type: 'MOVE_LIST',
      payload: list
    })
  }
}

export function setBoard (dispatch, id) {
  return new Promise((resolve, reject) => {
    dispatch({type: 'FETCH_BOARD_START'})
    fetchBoards().then((data) => {
      dispatch({
        type: 'FETCH_BOARD_SUCCESS',
        payload: data.filter(x => x._id === id)[0]
      })
      resolve(data.filter(x => x._id === id)[0])
    }).catch((err) => {
      dispatch({
        type: 'FETCH_BOARD_ERROR',
        payload: err
      })
      reject(err)
    })
  })
}

export function resetBoard (dispatch) {
  store.dispatch({
    type: 'RESET_BOARD'
  })
}

export function updateLists (dispatch, lists) {
  dispatch({
    type: 'UPDATE_LISTS',
    payload: lists
  })
}

export function updateCards (dispatch, listIndex, cards) {
  dispatch({
    type: 'UPDATE_CARDS',
    payload: {
      listIndex: listIndex,
      cards: cards
    }
  })
}

export function removeList (dispatch, boardId, list) {
  deleteList(boardId, list._id).then(res => {
    dispatch({
      type: 'REMOVE_LIST',
      payload: list
    })
  }).catch(err => {
    return err
  })
}

export function setConnectedUser (user) {
  store.dispatch({
    type: 'SET_USER',
    payload: user
  })
}

export function removeListLocal (list) {
  store.dispatch({
    type: 'REMOVE_LIST',
    payload: list
  })
}

export function addCard (dispatch, boardId, listId, content) {
  postCard(boardId, listId, content).then(card => {
  }).catch(err => {
    return err
  })
}
export function addCardLocal (listId, card) {
  store.dispatch({
    type: 'ADD_CARD',
    payload: {
      listId: listId,
      card: card
    }
  })
}

export function setBoardslist (dispatch) {
  return new Promise((resolve, reject) => {
    dispatch({type: 'FETCH_BOARDSLIST_START'})
    fetchBoards().then((data) => {
      dispatch({
        type: 'FETCH_BOARDSLIST_SUCCESS',
        payload: data
      })
      resolve(data)
    }).catch((err) => {
      dispatch({
        type: 'FETCH_BOARDSLIST_ERROR',
        payload: err
      })
    })
  })
}

export function addBoard (dispatch, payload) {
  addBoardDistant(payload).then((board) => {
    // <= HANDLED FROM SOCKETS
  }).catch(err => {
    return err
  })
}

export function addBoardLocal (board) {
  if (board) {
    store.dispatch({
      type: 'ADD_BOARD',
      payload: board
    })
  }
}

export function addCollaborator (dispatch, boardId, email) {
  addCollaboratorDistant(boardId, email).then((board) => {
  }).catch(err => {
    return err
  })
}

export function removeCollaborator (boardId, userId) {
  removeCollaboratorDistant(boardId, userId).then((board) => {
  }).catch(err => {
    return err
  })
}

export function replaceCollaboratorsLocal (users) {
  if (users) {
    store.dispatch({
      type: 'UPDATE_COLLABORATORS',
      payload: users
    })
  }
}

export function addChecklistAction (cardId, title) {
  if (cardId && title.length > 0) {
    store.dispatch({
      type: 'ADD_CHECKLIST',
      payload: {
        cardId: cardId,
        title: title
      }
    })
  }
}

export function removeChecklist (cardId, checklistIndex) {
  if (cardId && checklistIndex > -1) {
    store.dispatch({
      type: 'DELETE_CHECKLIST',
      payload: {
        cardId: cardId,
        checklistIndex: checklistIndex
      }
    })
  }
}

export function addChecklistItem (cardId, checklistIndex, content) {
  if (cardId && checklistIndex > -1 && content.length > 0) {
    store.dispatch({
      type: 'ADD_CHECKLIST_ITEM',
      payload: {
        cardId: cardId,
        checklistIndex: checklistIndex,
        content: content
      }
    })
  }
}

export function fetchMatchingUsers (email) {
  return new Promise((resolve, reject) => {
    fetchMatchingUsersEmail(email).then((users) => {
      resolve(users)
    }).catch(err => {
      reject(err)
    })
  })
}

export function updateChecklistItem (cardId, checklistIndex, itemIndex, content, doneDate = null) {
  if (cardId && checklistIndex > -1 && content.length > 0) {
    store.dispatch({
      type: 'UPDATE_CHECKLIST_ITEM',
      payload: {
        cardId: cardId,
        checklistIndex: checklistIndex,
        itemIndex: itemIndex,
        content: content,
        doneDate: doneDate
      }
    })
  }
}

export function deleteChecklistItem (cardId, checklistIndex, itemIndex) {
  if (cardId && checklistIndex > -1 && itemIndex > -1) {
    store.dispatch({
      type: 'DELETE_CHECKLIST_ITEM',
      payload: {
        cardId: cardId,
        checklistIndex: checklistIndex,
        itemIndex: itemIndex
      }
    })
  }
}

export function addMember (boardId, listId, cardId, email) {
  addMemberDistant(boardId, listId, cardId, email)
}

export function removeMember (boardId, listId, cardId, userId) {
  removeMemberDistant(boardId, listId, cardId, userId)
}

export function updateResponsible (boardId, listId, cardId, email) {
  updateResponsibleDistant(boardId, listId, cardId, email)
}

export function removeResponsible (boardId, listId, cardId, email) {
  removeResponsibleDistant(boardId, listId, cardId)
}

export function archiveCard (boardId, listId, card) {
  if (card.isArchived) { return }
  let newCard = { ...card, isArchived: true }
  store.dispatch({
    type: 'UPDATE_CARD',
    payload: {
      listId: listId,
      card: newCard
    }
  })
  updateCard(boardId, listId, card._id, newCard)
}

export function restoreCard (boardId, listId, card) {
  if (!card.isArchived) { return }
  let newCard = { ...card, isArchived: false }
  store.dispatch({
    type: 'UPDATE_CARD',
    payload: {
      listId: listId,
      card: newCard
    }
  })
  updateCard(boardId, listId, card._id, newCard)
}

export function archiveList (boardId, list) {
  if (list.isArchived) { return }
  list.isArchived = true
  store.dispatch({
    type: 'UPDATE_LIST',
    payload: list
  })
  updateList(boardId, list._id, list)
}

export function restoreList (boardId, list) {
  if (!list.isArchived) { return }
  let newList = { ...list, isArchived: false }
  updateList(boardId, list._id, newList)
  store.dispatch({
    type: 'UPDATE_LIST',
    payload: newList
  })
}
