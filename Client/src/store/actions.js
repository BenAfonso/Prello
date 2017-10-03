import { fetchBoard } from '../services/Board.services'
import { addListDistant } from '../services/List.services'

export function addList (dispatch, boardId, name) {
  addListDistant(boardId, name)
    .then((list) => {
      dispatch({
        type: 'ADD_LIST',
        payload: {
          name: list.name
        }
      })
    })
}

export function setBoard (dispatch) {
  dispatch({type: 'FETCH_BOARD_START'})
  fetchBoard().then((data) => {
    dispatch({
      type: 'FETCH_BOARD_SUCCESS',
      payload: data[0]
    })
  }).catch((err) => {
    dispatch({
      type: 'FETCH_BOARD_ERROR',
      payload: err
    })
  })
}

export function updateLists (dispatch, lists) {
  dispatch({
    type: 'UPDATE_LISTS',
    payload: lists
  })
}

export function addCard (dispatch, index, content) {
  dispatch({
    type: 'ADD_CARD',
    payload: {
      listIndex: index,
      content: content
    }
  })
}
