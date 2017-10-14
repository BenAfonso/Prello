import { fetchBoard } from '../services/Board.services'
import { addListDistant, postCard, deleteList, moveListDistant } from '../services/List.services'
import { moveCard } from '../services/Card.services'

export function addList (dispatch, boardId, name) {
  addListDistant(boardId, name)
    .then((list) => {
      dispatch({
        type: 'ADD_LIST',
        payload: list
      })
    })
}

export function moveList (dispatch, boardId, listId, position) {
  moveListDistant(boardId, listId, position)
    .then((lists) => {
      console.log(lists)
      dispatch({
        type: 'MOVE_LIST',
        payload: lists
      })
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
