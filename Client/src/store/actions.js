export function addList (dispatch, title) {
  dispatch({
    type: 'ADD_LIST',
    payload: {
      title: title
    }
  })
}
