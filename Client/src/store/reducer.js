export default function reducer (state, action) {
  switch (action.type) {
    case 'ADD_BOARD': {
      let newBoards = state.boardslist.boards.slice()
      newBoards.push(action.payload)
      return {
        ...state,
        boardslist: {
          ...state.boardslist,
          boards: newBoards
        }
      }
    }
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
    case 'FETCH_BOARDSLIST_ERROR': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    case 'FETCH_BOARDSLIST_START': {
      return {
        ...state,
        fetching: true
      }
    }
    case 'FETCH_BOARDSLIST_SUCCESS': {
      return {
        ...state,
        fetching: false,
        boardslist: {
          ...state.boardslist,
          boards: action.payload
        }
      }
    }
    case 'RESET_BOARD': {
      return {
        ...state,
        board: {
          _id: '',
          title: '',
          lists: [],
          visibility: '',
          isArchived: false,
          background: '',
          collaborators: []
        }
      }
    }
    case 'ADD_LIST': {
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
    case 'MOVE_CARD': {
      return {
        ...state,
        board: {
          ...state.board,
          lists: action.payload
        }
      }
    }
    case 'ADD_CARD': {
      let newLists = state.board.lists.map((l) => {
        if (l._id === action.payload.listId) {
          l.cards.push(action.payload.card)
        }
        return l
      })
      return {
        ...state,
        board: {
          ...state.board,
          lists: newLists
        }
      }
    }
    case 'MOVE_CARD': {
      const { index, originalListIndex, newListIndex } = action.payload
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
