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
      let cardToMove = state.board.lists[action.payload.originalListIndex].cards[action.payload.index] //action.payload.index: Index of the card to move in the list
      let newLists = state.board.lists.slice()
      // Use only one list instance if the old and the new list are the same otherwise we would duplicate the list
      if (action.payload.originalListIndex === action.payload.newListIndex) {
        let newCardsOriginalList = state.board.lists[action.payload.originalListIndex].cards.slice()
        newCardsOriginalList.splice(action.payload.index, 1)
        newCardsOriginalList.splice(action.payload.newPosition, 0, cardToMove)
        newLists[action.payload.originalListIndex] = {
          ...state.board.lists[action.payload.originalListIndex],
          cards: newCardsOriginalList
        }
        // Use the two list if the old and the new list are different
      } else {
        let newCardsOriginalList = state.board.lists[action.payload.originalListIndex].cards.slice()
        let newCardsDestinationList = state.board.lists[action.payload.newListIndex].cards.slice()

        newCardsOriginalList.splice(action.payload.index, 1)
        newCardsDestinationList.splice(action.payload.newPosition, 0, cardToMove)

        newLists[action.payload.originalListIndex] = {
          ...state.board.lists[action.payload.originalListIndex],
          cards: newCardsOriginalList
        }

        newLists[action.payload.newListIndex] = {
          ...state.board.lists[action.payload.newListIndex],
          cards: newCardsDestinationList
        }
      }
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
