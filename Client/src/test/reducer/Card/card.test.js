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

  it('should add an empty checklist to a card', () => {
    const action = {
      type: 'ADD_CHECKLIST',
      payload: {
        cardId: '0',
        title: 'HOORAY !'
      }
    }

    const beforeState = {
      fetching: false,
      fetched: false,
      error: null,
      board: {
        _id: '0',
        title: 'MyBoard',
        lists: [{_id: '0',
          name: 'MyList',
          isArchived: false,
          cards: [{
            _id: '0',
            text: 'Hello world',
            isArchived: false,
            checklists: []
          }]
        }],
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
          cards: [{
            _id: '0',
            text: 'Hello world',
            isArchived: false,
            checklists: [{title: action.payload.title, index: 0, items: []}]
          }]
        }],
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

  it('should NOT add a checklist with an empty title', () => {
    const action = {
      type: 'ADD_CHECKLIST',
      payload: {
        cardId: '0',
        title: ''
      }
    }

    const beforeState = {
      board: {
        _id: '0',
        title: 'MyBoard',
        lists: [{_id: '0',
          name: 'MyList',
          isArchived: false,
          cards: [{
            _id: '0',
            text: 'Hello world',
            isArchived: false,
            checklists: []
          }]
        }]
      }
    }

    const afterState = {
      board: {
        _id: '0',
        title: 'MyBoard',
        lists: [{_id: '0',
          name: 'MyList',
          isArchived: false,
          cards: [{
            _id: '0',
            text: 'Hello world',
            isArchived: false,
            checklists: [{title: action.payload.title, index: 0, items: []}]
          }]
        }]
      }
    }
    expect(reducer(beforeState, action)).not.toEqual(afterState)
  })

  

  it('should add a checklist item to a checklist', () => {
    const action = {
      type: 'ADD_CHECKLIST_ITEM',
      payload: {
        cardId: 'badId',
        checklistIndex: 0,
        content: 'HOORAY'
      }
    }

    const beforeState = {
      board: {
        _id: '0',
        title: 'MyBoard',
        lists: [{_id: '0',
          name: 'MyList',
          isArchived: false,
          cards: [{
            _id: '0',
            text: 'Hello world',
            isArchived: false,
            checklists: [{title: 'MyChecklist', index: 0, items: []}]
          }]
        }]
      }
    }

    const afterState = {
      board: {
        _id: '0',
        title: 'MyBoard',
        lists: [{_id: '0',
          name: 'MyList',
          isArchived: false,
          cards: [{
            _id: '0',
            text: 'Hello world',
            isArchived: false,
            checklists: [{title: 'MyChecklist', index: 0, items: []}]
          }, {
            _id: 'badId',
            text: 'Hello there',
            isArchived: false,
            checklists: [{title: 'MyChecklist2', index: 0, items: []}]
          }]
        }]
      }
    }
    expect(reducer(beforeState, action)).not.toEqual(afterState)
  })

  it('should add a checklist item to a checklist', () => {
    const action = {
      type: 'ADD_CHECKLIST_ITEM',
      payload: {
        cardId: '0',
        checklistIndex: 0,
        content: 'HOORAY'
      }
    }

    const beforeState = {
      board: {
        _id: '0',
        title: 'MyBoard',
        lists: [{_id: '0',
          name: 'MyList',
          isArchived: false,
          cards: [{
            _id: '0',
            text: 'Hello world',
            isArchived: false,
            checklists: [{title: 'MyChecklist', index: 0, items: []}]
          }]
        }]
      }
    }

    const afterState = {
      board: {
        _id: '0',
        title: 'MyBoard',
        lists: [{_id: '0',
          name: 'MyList',
          isArchived: false,
          cards: [{
            _id: '0',
            text: 'Hello world',
            isArchived: false,
            checklists: [{title: 'MyChecklist',
              index: 0,
              items: [{
                index: 0,
                done: false,
                doneDate: null,
                content: action.payload.content
              }]
            }]
          }]
        }]
      }
    }
    expect(reducer(beforeState, action)).toEqual(afterState)
  })

  it('should delete a checklist item from a checklist', () => {
    const action = {
      type: 'DELETE_CHECKLIST_ITEM',
      payload: {
        cardId: '0',
        checklistIndex: 0,
        itemIndex: 0
      }
    }
    const beforeState = {
      board: {
        _id: '0',
        title: 'MyBoard',
        lists: [{_id: '0',
          name: 'MyList',
          isArchived: false,
          cards: [{
            _id: '0',
            text: 'Hello world',
            isArchived: false,
            checklists: [{title: 'MyChecklist',
              index: 0,
              items: [{
                index: 0,
                done: false,
                doneDate: null,
                content: 'Don\'t delete me please :('
              }]
            }]
          }]
        }]
      }
    }

    const afterState = {
      board: {
        _id: '0',
        title: 'MyBoard',
        lists: [{_id: '0',
          name: 'MyList',
          isArchived: false,
          cards: [{
            _id: '0',
            text: 'Hello world',
            isArchived: false,
            checklists: [{title: 'MyChecklist', index: 0, items: []}]
          }]
        }]
      }
    }
    expect(reducer(beforeState, action)).toEqual(afterState)
  })
})
