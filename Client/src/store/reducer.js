export default function reducer (state, action) {
  switch (action.type) {
    case 'ADD_LIST': {
      let newLists = state.currentBoard.lists.slice()
      newLists.push({ title: action.payload.title, cards: [] })
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
