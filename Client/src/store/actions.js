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
      dispatch({
        type: 'MOVE_LIST',
        payload: lists
      })
    })
}

export function setBoard (dispatch) {
  return new Promise((resolve, reject) => {
    dispatch({type: 'FETCH_BOARD_START'})
    fetchBoard().then((data) => {
      dispatch({
        type: 'FETCH_BOARD_SUCCESS',
        payload: data[0]
      })
      resolve(data[0])
    }).catch((err) => {
      dispatch({
        type: 'FETCH_BOARD_ERROR',
        payload: err
      })
      reject(err)
    })
  })
}

export function updateLists (dispatch, lists) {
  dispatch({
    type: 'UPDATE_LISTS',
    payload: lists
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

export function addCard (dispatch, listIndex, list, content) {
  postCard(list._id, content).then(card => {
    dispatch({
      type: 'ADD_CARD',
      payload: {
        listIndex: listIndex,
        card: card
      }
    })
  }).catch(err => {
    return err
  })
}
