import { defaultFetchedUserState } from '../store'

export default (state = defaultFetchedUserState, action) => {
  switch (action.type) {
    case 'FETCH_USER_PROFILE_START': {
      return {
        ...state,
        fetching: true
      }
    }
    case 'FETCH_USER_PROFILE_SUCCESS': {
      return {
        ...state,
        fetching: false,
        user: action.payload
      }
    }
    case 'FETCH_USER_PROFILE_ERROR': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    case 'SET_FETCHED_USER_TEAMS': {
      return {
        ...state,
        teams: action.payload
      }
    }
    case 'SET_FETCHED_USER_BOARDS': {
      return {
        ...state
      }
    }
    default:
      return {
        ...state
      }
  }
}
