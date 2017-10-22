import { defaultState } from '../../../store/store'
import reducer from '../../../store/reducer'

describe('Card reducer actions', () => {
  it('should add a card to a list', () => {
    const action = {
      type: 'ADD_CARD',
      payload: {
        listId: '0',
        card: {
          text: 'Hello world',
          isArchived: false
        }
      }
    }

    const beforeState = {
      fetching: false,
      fetched: false,
      error: null,
      board: {
        _id: '0',
        title: 'MyBoard',
        lists: [{_id: '0', name: 'MyList', isArchived: false, cards: []}],
        visibility: 'public',
        isArchived: false,
        background: 'pink',
        collaborators: []
      },
      boardslist: {
        boards: []
      }
    }

    const afterState = {
      fetching: false,
      fetched: false,
      error: null,
      board: {
        _id: '0',
        title: 'MyBoard',
        lists: [{_id: '0',
          name: 'MyList',
          isArchived: false,
          cards: [
            action.payload.card
          ]}],
        visibility: 'public',
        isArchived: false,
        background: 'pink',
        collaborators: []
      },
      boardslist: {
        boards: []
      }
    }

    expect(reducer(beforeState, action)).toEqual(afterState)
  })
})
