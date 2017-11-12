import { defaultBoardState } from '../../../store/store'

import reducer from '../../../store/reducers/board.reducer'

describe('Current board reducer tests', () => {
  it('should add a list to the board', () => {
    const newState = {
      ...defaultBoardState,
      board: {
        ...defaultBoardState.board,
        lists: [{name: 'List', archived: false}]
      }
    }

    const action = {
      type: 'ADD_LIST',
      payload: {
        name: 'List',
        archived: false
      }
    }
    expect(reducer(defaultBoardState, action)).toEqual(newState)
  })

  it('should NOT add a list with an empty title to the board', () => {
    const newState = {
      ...defaultBoardState,
      board: {
        ...defaultBoardState.board,
        lists: [{_id: '0', name: '', archived: false}]
      }
    }

    const action = {
      type: 'ADD_LIST',
      payload: {
        name: '',
        archived: false
      }
    }
    expect(reducer(defaultBoardState, action)).not.toEqual(newState)
  })

  it('should add a card to a list of the current board', () => {
    const previousState = {
      ...defaultBoardState,
      board: {
        ...defaultBoardState.board,
        lists: [{_id: '0', name: 'List', archived: false, cards: []}]
      }
    }

    const action = {
      type: 'ADD_CARD',
      payload: {
        listId: '0',
        card: {
          text: 'Card'
        }
      }
    }

    const nextState = {
      ...previousState,
      board: {
        ...previousState.board,
        lists: [{ _id: '0', name: 'List', archived: false, cards: [{text: 'Card'}] }]
      }
    }

    expect(reducer(previousState, action)).toEqual(nextState)
  })

  it('should NOT add a card with an empty title', () => {
    const previousState = {
      ...defaultBoardState,
      board: {
        ...defaultBoardState.board,
        lists: [{_id: '0', name: 'List', archived: false, cards: []}]
      }
    }

    const action = {
      type: 'ADD_CARD',
      payload: {
        listId: '0',
        card: {
          text: ''
        }
      }
    }

    const nextState = {
      ...previousState,
      board: {
        ...previousState.board,
        lists: [{ _id: '0', name: 'List', archived: false, cards: [{text: ''}] }]
      }
    }

    expect(reducer(previousState, action)).not.toEqual(nextState)
  })

  it('should NOT modify the state when adding a card on a list with an invalid id', () => {
    const previousState = {
      ...defaultBoardState,
      board: {
        ...defaultBoardState.board,
        lists: [{_id: '0', name: 'List', archived: false, cards: []}]
      }
    }

    const action = {
      type: 'ADD_CARD',
      payload: {
        listId: 'invalid',
        card: {
          text: 'Invalid'
        }
      }
    }

    expect(reducer(previousState, action)).toEqual(previousState)
  })

  it('should add a checklist to a card', () => {
    const previousState = {
      ...defaultBoardState,
      board: {
        ...defaultBoardState.board,
        lists: [{_id: '0',
          name: 'List',
          archived: false,
          cards: [
            {text: '', checklists: []}
          ]}]
      }
    }

    const nextState = {

    }

    const action = {
      type: 'ADD_CHECKLIST',
      payload: {

      }
    }

    expect(reducer(previousState, action)).toEqual(nextState)
  })
})
