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
      console.log('MOVE_CARD : card_id : ' + action.payload.id+ ' originalListId ' + action.payload.originalListIndex +' newListId' + action.payload.newListIndex)
      let cardToMove = state.board.lists[action.payload.originalListIndex].cards[action.payload.id]
      let newCardsOriginalList = state.board.lists[action.payload.originalListIndex].cards
      let newCardsDestinationList = state.board.lists[action.payload.newListIndex].cards

      newCardsOriginalList.splice(newCardsOriginalList.indexOf(cardToMove), 1)
      newCardsDestinationList.push(cardToMove)
      return {
        ...state,
        board: {
          ...state.board,
          lists: [...state.board.lists, {
            id: state.board.lists[action.payload.originalListIndex].id,
            name: state.board.lists[action.payload.originalListIndex].name,
            cards: newCardsOriginalList
          }, {
            id: state.board.lists[action.payload.newListIndex].id,
            name: state.board.lists[action.payload.newListIndex].name,
            cards: newCardsDestinationList
          }
          ]
        }
      }
    }
    default:
      return state
  }
}
