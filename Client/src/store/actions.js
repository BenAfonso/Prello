export function addList (dispatch, title) {
  dispatch({
    type: 'ADD_LIST',
    payload: {
      title: title
    }
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
