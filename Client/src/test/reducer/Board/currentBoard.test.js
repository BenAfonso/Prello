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

  it('should delete a list of the board', () => {
    const previousState = {
      ...defaultBoardState,
      board: {
        ...defaultBoardState.board,
        lists: [{_id: '0', name: '', archived: false}]
      }
    }

    const action = {
      type: 'REMOVE_LIST',
      payload: {
        _id: '0'
      }
    }

    expect(reducer(previousState, action)).toEqual(defaultBoardState)
  })

  it('should NOT change the state when deleting a list with an invalid id of the board', () => {
    const previousState = {
      ...defaultBoardState,
      board: {
        ...defaultBoardState.board,
        lists: [{_id: '0', name: '', archived: false}]
      }
    }

    const action = {
      type: 'REMOVE_LIST',
      payload: {
        _id: 'toto'
      }
    }

    expect(reducer(previousState, action)).toEqual(previousState)
  })

  it('should update a list when changing its title', () => {
    const previousState = {
      ...defaultBoardState,
      board: {
        ...defaultBoardState.board,
        lists: [{_id: '0', name: 'Before title', archived: false}]
      }
    }

    const nextState = {
      ...previousState,
      board: {
        ...previousState.board,
        lists: [{_id: '0', name: 'After title', archived: false}]
      }
    }

    const action = {
      type: 'UPDATE_LIST',
      payload: {
        _id: '0',
        name: 'After title',
        archived: false
      }
    }

    expect(reducer(previousState, action)).toEqual(nextState)
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

  it('should update the title of a card', () => {
    const previousState = {
      ...defaultBoardState,
      board: {
        ...defaultBoardState.board,
        lists: [{ _id: '0', name: 'List', archived: false, cards: [{_id: '0', text: 'Card'}] }]
      }
    }

    const nextState = {
      ...previousState,
      board: {
        ...previousState.board,
        lists: [{ _id: '0', name: 'List', archived: false, cards: [{_id: '0', text: 'Updated card'}] }]
      }
    }

    const action = {
      type: 'UPDATE_CARD',
      payload: {
        listId: '0',
        card: {
          _id: '0',
          text: 'Updated card'
        }
      }
    }

    expect(reducer(previousState, action)).toEqual(nextState)
  })

  it('should NOT update the title of a card if it is empty', () => {
    const previousState = {
      ...defaultBoardState,
      board: {
        ...defaultBoardState.board,
        lists: [{ _id: '0', name: 'List', archived: false, cards: [{_id: '0', text: 'Card'}] }]
      }
    }

    const action = {
      type: 'UPDATE_CARD',
      payload: {
        listId: '0',
        card: {
          _id: '0',
          text: ''
        }
      }
    }

    expect(reducer(previousState, action)).toEqual(previousState)
  })

  it('should move the position of a list inside a board', () => {
    const previousState = {
      ...defaultBoardState,
      board: {
        ...defaultBoardState.board,
        lists: [{ _id: '0', name: 'List', archived: false, cards: [] },
          { _id: '1', name: 'List2', archived: false, cards: [] }]
      }
    }

    const nextState = {
      ...previousState,
      board: {
        ...previousState.board,
        lists: [{ _id: '1', name: 'List2', archived: false, cards: [] },
          { _id: '0', name: 'List', archived: false, cards: [] }]
      }
    }

    const action = {
      type: 'MOVE_CARD',
      payload: [{ _id: '1', name: 'List2', archived: false, cards: [] },
        { _id: '0', name: 'List', archived: false, cards: [] }]
    }

    expect(reducer(previousState, action)).toEqual(nextState)
  })

  it('should add a checklist to a card', () => {
    const previousState = {
      ...defaultBoardState,
      board: {
        ...defaultBoardState.board,
        lists: [{ _id: '0', name: 'List', archived: false, cards: [{_id: '0', text: 'Card', checklists: []}] }]
      }
    }

    const nextState = {
      ...previousState,
      board: {
        ...previousState.board,
        lists: [{ _id: '0',
          name: 'List',
          archived: false,
          cards: [{_id: '0',
            text: 'Card',
            checklists: [{
              _id: '0',
              text: 'Checklist',
              items: []
            }]
          }]
        }]
      }
    }

    const action = {
      type: 'UPDATE_CARD',
      payload: {
        listId: '0',
        card: {
          _id: '0',
          text: 'Card',
          checklists: [{
            _id: '0',
            text: 'Checklist',
            items: []
          }]
        }
      }
    }

    expect(reducer(previousState, action)).toEqual(nextState)
  })

  it('should NOT add a cheklist with an empty text to a card', () => {
    const previousState = {
      ...defaultBoardState,
      board: {
        ...defaultBoardState.board,
        lists: [{ _id: '0', name: 'List', archived: false, cards: [{_id: '0', text: 'Card', checklists: []}] }]
      }
    }

    const action = {
      type: 'UPDATE_CARD',
      payload: {
        listId: '0',
        card: {
          _id: '0',
          text: 'Card',
          checklists: [{
            _id: '0',
            text: '',
            items: []
          }]
        }
      }
    }

    expect(reducer(previousState, action)).toEqual(previousState)
  })
})
