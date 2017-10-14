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
        board: action.payload
      }
    }
    case 'ADD_LIST': {
      console.log('adding list')
      let newLists = state.board.lists.slice()
      newLists.push(action.payload)
      return {
        ...state,
        board: {
          ...state.board,
          lists: newLists
        }
      }
    }
    case 'UPDATE_LISTS': {
      return {
        ...state,
        board: {
          ...state.board,
          lists: action.payload
        }
      }
    }
    case 'UPDATE_CARDS': {
      let newLists = state.board.lists.slice()
      newLists[action.payload.listIndex].cards = action.payload.cards
      return {
        ...state,
        board: {
          ...state.board,
          lists: newLists
        }
      }
    }
    case 'REMOVE_LIST': {
      return {
        ...state,
        board: {
          ...state.board,
          lists: state.board.lists.filter(l => l._id !== action.payload._id)
        }
      }
    }
    case 'MOVE_LIST': {
      return {
        ...state,
        board: {
          ...state.board,
          lists: action.payload
        }
      }
    }
    case 'ADD_CARD': {
      let newLists = state.board.lists.slice()
      newLists[action.payload.listIndex].cards.push(action.payload.card)
      return {
        ...state,
        board: {
          ...state.board,
          lists: newLists
        }
      }
    }
    case 'MOVE_CARD': {
      const { index, originalListIndex, newListIndex, newPosition } = action.payload
      let newLists = state.board.lists.slice()
      let card = newLists[originalListIndex].cards.slice()[index]
      newLists[originalListIndex].cards.splice(index, 1)
      newLists[newListIndex].cards.splice(newListIndex, 0, card)
      return {
        ...state,
        board: {
          ...state.board,
          lists: newLists
        }
      }
    }
    default:
      return state
  }
}
