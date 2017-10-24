import { defaultState } from '../../../store/store'
import reducer from '../../../store/reducer'

describe('Board actions reducer', () => {
  it('should add a board to the state', () => {
    const action = {
      type: 'ADD_BOARD',
      payload: {
        title: 'MyBoard',
        background: 'pink',
        visiblity: 'public'
      }
    }

    const newState = {
      currentUser: {
        username: '',
        name: '',
        avatar: ''
      },
      fetching: false,
      fetched: false,
      error: null,
      board: {
        _id: '',
        title: '',
        lists: [],
        visibility: '',
        isArchived: false,
        background: '#fff',
        collaborators: []
      },
      boardslist: {
        boards: [action.payload]
      }
    }

    expect(reducer(defaultState, action)).toEqual(newState)
  })
})
