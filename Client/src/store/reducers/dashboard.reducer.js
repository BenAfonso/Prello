import {defaultDashboardState} from '../store'

export default (state = defaultDashboardState, action) => {
  switch (action.type) {
    case 'SET_ANALYTICS_BOARDS': {
      return {
        ...state,
        boards: action.payload
      }
    }
    case 'SET_ANALYTICS_BOARD': {
      return {
        ...state,
        board: {
          ...state.board,
          ...action.payload
        }
      }
    }
    case 'SET_BOARD_ANALYTICS': {
      return {
        ...state,
        board: {
          ...state.board,
          numbers: action.payload
        }
      }
    }
    case 'SET_LISTS_ANALYTICS': {
      return {
        ...state,
        lists: action.payload
      }
    }
    case 'SET_USERS_ANALYTICS': {
      return {
        ...state,
        users: action.payload
      }
    }
    case 'RESET_BOARD_ANALYTICS': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: null,
        boards: [],
        board: {
          _id: '',
          title: '',
          background: '#fff',
          provider: '',
          numbers: []
        },
        lists: [],
        users: []
      }
    }
    default:
      return {
        ...state
      }
  }
}
