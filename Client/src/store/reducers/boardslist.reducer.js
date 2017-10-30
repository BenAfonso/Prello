import { defaultBoardslistState } from '../store'

export default (state = defaultBoardslistState, action) => {
  switch (action.type) {
    case 'ADD_BOARD': {
      let newBoards = state.boards.slice()
      newBoards.push(action.payload)
      return {
        ...state.boardslist,
        boards: newBoards
      }
    }
    case 'FETCH_BOARDSLIST_SUCCESS': {
      return {
        ...state.boardslist,
        boards: action.payload
      }
    }
    default:
      return {
        ...state
      }
  }
}
