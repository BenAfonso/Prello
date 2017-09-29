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
    default:
      return state
  }
}
