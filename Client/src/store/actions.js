import { fetchBoard } from '../services/Board.services'
import { addListDistant } from '../services/List.services'
import { moveCard } from '../services/Card.services'

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

export function moveCardAction (dispatch, card, originalListId, newListId) {
  moveCard(card, originalListId, newListId).then((res) => {
    dispatch({type: 'MOVE_CARD',
      payload: {
        id: card.id,
        content: card.content
      }
    })
  }).catch((err) => {
    console.log(err) // TODO : Display on the screen a message to the user
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
