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
        board: action.payload
      }
    }
    default:
      return {
        ...state
      }
  }
}
