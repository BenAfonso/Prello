import { defaultTeamState } from '../store'

export default (state = defaultTeamState, action) => {
  switch (action.type) {
    case 'SET_FETCHING_STATE': {
      return {
        ...state.currentTeam,
        fetching: action.payload.state
      }
    }
    case 'FETCH_TEAM_ERROR': {
      return {
        ...state.currentTeam,
        fetching: false,
        error: action.payload
      }
    }
    case 'FETCH_TEAM_START': {
      return {
        ...state,
        fetching: true
      }
    }
    case 'FETCH_TEAM_SUCCESS': {
      return {
        ...state,
        fetching: false,
        team: action.payload
      }
    }
    default:
      return {
        ...state
      }
  }
}
