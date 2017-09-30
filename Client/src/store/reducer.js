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
    case 'ADD_CARD': {
      let newCards = state.currentBoard.lists[1].cards.slice()
      newCards.push({description: action.payload.content})
      return {
        currentBoard: {
          lists: [
            {
              title: 'TODO',
              cards: []
            },
            {
              title: 'WIP',
              cards: newCards
            }
          ]
        }
      }
    }
    default:
      return state
  }
}
