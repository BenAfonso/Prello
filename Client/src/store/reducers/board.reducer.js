import { defaultBoardState } from '../store'

export default (state = defaultBoardState, action) => {
  switch (action.type) {
    case 'RESET_BOARD': {
      return {
        ...state.currentBoard,
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
    case 'SET_FETCHING_STATE': {
      return {
        ...state.currentBoard,
        fetching: action.payload.state
      }
    }
    case 'FETCH_BOARD_ERROR': {
      return {
        ...state.currentBoard,
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
    case 'UPDATE_LIST': {
      let newLists = state.board.lists.slice()
      let updatedList = newLists.filter(l => l._id === action.payload._id)
      let listIndex = newLists.indexOf(updatedList[0])
      newLists[listIndex] = action.payload
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
      if (action.payload.card.text.length > 0) {
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
      } else {
        return {
          ...state
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
    case 'UPDATE_CARD': {
      let newLists = state.board.lists.slice()
      let updatedList = newLists.filter(l => l._id === action.payload.listId)
      let updatedCard = updatedList[0].cards.filter(c => c._id === action.payload.card._id)
      let listIndex = newLists.indexOf(updatedList[0])
      let cardIndex = updatedList[0].cards.indexOf(updatedCard[0])
      newLists[listIndex].cards[cardIndex] = action.payload.card
      return {
        ...state,
        board: {
          ...state.board,
          lists: newLists
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
    case 'UPDATE_COLLABORATORS': {
      const newCollaborators = action.payload
      return {
        ...state,
        board: {
          ...state.board,
          collaborators: newCollaborators
        }
      }
    }
    case 'UPDATE_TEAMS': {
      const newTeams = action.payload
      return {
        ...state,
        board: {
          ...state.board,
          teams: newTeams
        }
      }
    }
    case 'ADD_LABEL': {
      const newLabels = action.payload
      return {
        ...state,
        board: {
          ...state.board,
          labels: newLabels
        }
      }
    }
    case 'REMOVE_LABEL': {
      let newLabels = action.payload
      return {
        ...state,
        board: {
          ...state.board,
          labels: newLabels
        }
      }
    }
    case 'UPDATE_LABEL': {
      let newLabels = action.payload
      return {
        ...state,
        board: {
          ...state.board,
          labels: newLabels
        }
      }
    }
    case 'SET_BOARD_HISTORY': {
      return {
        ...state,
        board: {
          ...state.board,
          modifications: action.payload
        }
      }
    }
    default:
      return {
        ...state
      }
  }
}
