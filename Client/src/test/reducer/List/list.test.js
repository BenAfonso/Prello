import reducer from '../../../store/reducer'

describe('List actions reducer', () => {
  it('should add a list to the board', () => {
    const action = {
      type: 'ADD_LIST',
      payload: {
        name: 'MyList',
        isArchived: false
      }
    }

    const beforeState = {
      fetching: false,
      fetched: false,
      error: null,
      board: {
        _id: '0',
        title: 'MyBoard',
        lists: [],
        visibility: 'public',
        isArchived: false,
        background: 'pink',
        collaborators: []
      },
      boardslist: {
        boards: []
      }
    }

    const newState = {
      fetching: false,
      fetched: false,
      error: null,
      board: {
        _id: '0',
        title: 'MyBoard',
        lists: [{name: 'MyList', isArchived: false}],
        visibility: 'public',
        isArchived: false,
        background: 'pink',
        collaborators: []
      },
      boardslist: {
        boards: []
      }
    }

    expect(reducer(beforeState, action)).toEqual(newState)
  })
})
