import { fetchBoards, addBoardDistant, addCollaboratorDistant } from '../services/Board.services'
import { addListDistant, postCard, deleteList, moveListDistant } from '../services/List.services'
import { moveCard, addMemberDistant } from '../services/Card.services'
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

export function updateCard (listId, card) {
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

export function removeListLocal (list) {
  store.dispatch({
    type: 'REMOVE_LIST',
    payload: list
  })
}

export function addCard (dispatch, boardId, listIndex, list, content) {
  postCard(boardId, list._id, content).then(card => {
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

export function replaceCollaboratorsLocal (users) {
  if (users) {
    store.dispatch({
      type: 'UPDATE_COLLABORATORS',
      payload: users
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

export function addMember (dispatch, cardId, userId) {
  addMemberDistant(cardId, userId).then(board => {
  }).catch(err => {
    return err
  })
}

export function replaceMembersLocal (members) {
  if (members) {
    store.dispatch({
      type: 'UPDATE_MEMBERS',
      payload: members
    })
  }
}
