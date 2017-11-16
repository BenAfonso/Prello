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
        user: Object.assign(action.payload, {teams: [], boards: [], modifications: []}) // Trick not to have an error about teams undefined on profile page
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
        user: {
          ...state.user,
          teams: action.payload
        }
      }
    }
    case 'SET_FETCHED_USER_HISTORY': {
      return {
        ...state,
        user: {
          ...state.user,
          modifications: action.payload
        }
      }
    }
    case 'SET_FETCHED_USER_BOARDS': {
      return {
        ...state,
        user: {
          ...state.user,
          boards: action.payload
        }
      }
    }
    case 'UPDATE_USER_PROFILE_PAGE': {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
          username: action.payload.username,
          picture: action.payload.picture,
          bio: action.payload.bio
        }
      }
    }
    case 'ADD_BOARD_FROM_PROFILE_PAGE': {
      let newBoards = state.user.boards
      newBoards.push(action.payload)
      return {
        ...state,
        user: {
          ...state.user,
          boards: newBoards
        }
      }
    }
    case 'ADD_TEAM_FROM_PROFILE_PAGE': {
      let newTeams = state.user.teams
      newTeams.push(action.payload)
      return {
        ...state,
        user: {
          ...state.user,
          teams: newTeams
        }
      }
    }
    default:
      return {
        ...state
      }
  }
}
