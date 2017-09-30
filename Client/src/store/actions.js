import axios from 'axios'
// TEMPORARY

function fetchBoard () {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:3333/boards').then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

function addListDistant (boardId, listName) {
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:3333/boards/${boardId}/lists`, {
      name: listName
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

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

export function addCard (dispatch, content) {
  dispatch({
    type: 'ADD_CARD',
    payload: {
      content: content
    }
  })
}
