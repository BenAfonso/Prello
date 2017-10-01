export default function reducer (state, action) {
  switch (action.type) {
    case 'FETCH_BOARD_ERROR': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    case 'FETCH_BOARD_START': {
      return {
        ...state,
        fetching: true
      }
    }
    case 'FETCH_BOARD_SUCCESS': {
      return {
        ...state,
        fetching: false,
        currentBoard: action.payload
      }
    }
    case 'ADD_LIST': {
      let newLists = state.currentBoard.lists.slice()
      newLists.push({ name: action.payload.name, cards: [] })
      return {
        ...state,
        currentBoard: {
          ...state.currentBoard,
          lists: newLists
        }
      }
    }
    case 'UPDATE_LISTS': {
      return {
        ...state,
        currentBoard: {
          ...state.currentBoard,
          lists: action.payload
        }
      }
    }
    case 'ADD_CARD': {
      let newLists = state.currentBoard.lists.slice()
      newLists[action.payload.listIndex].cards.push({description: action.payload.content})
      return {
        ...state,
        currentBoard: {
          ...state.currentBoard,
          lists: newLists
        }
      }
    }
    default:
      return state
  }
}
