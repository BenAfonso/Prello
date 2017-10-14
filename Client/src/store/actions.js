import { fetchBoard } from '../services/Board.services'
import { addListDistant, postCard, deleteList, moveListDistant } from '../services/List.services'
import store from '../store/store'

export function addList (dispatch, boardId, name) {
  addListDistant(boardId, name)
    .then((list) => {
     // dispatch({
     //   type: 'ADD_LIST',
     //   payload: list
     // })
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

export function moveList (dispatch, boardId, listId, position) {
  moveListDistant(boardId, listId, position)
    .then((lists) => {
     /* dispatch({
        type: 'MOVE_LIST',
        payload: lists
      })*/
    })
}

export function moveCardAction (dispatch, cardOriginalIndex, originalListIndex, newListIndex, newPosition) {
  dispatch({type: 'MOVE_CARD',
    payload: {
      index: cardOriginalIndex,
      originalListIndex: originalListIndex,
      newListIndex: newListIndex,
      newPosition: newPosition
    }
  })
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
    fetchBoard().then((data) => {
      dispatch({
        type: 'FETCH_BOARD_SUCCESS',
        payload: data.filter(x=>x._id===id)[0]
      })
      resolve(data.filter(x=>x._id===id)[0])
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
  dispatch({type: 'FETCH_BOARDSLIST_START'})
  fetchBoard().then((data) => {
    dispatch({
      type: 'FETCH_BOARDSLIST_SUCCESS',
      payload: data
    })
  }).catch((err) => {
    dispatch({
      type: 'FETCH_BOARDSLIST_ERROR',
      payload: err
    })
  })
}