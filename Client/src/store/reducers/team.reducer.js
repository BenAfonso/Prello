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
    case 'REMOVE_MEMBER': {
      return {
        ...state,
        team: {
          ...state.team,
          users: state.team.users.filter(u => u._id !== action.payload)
        }
      }
    }
    case 'REMOVE_ADMIN': {
      return {
        ...state,
        team: {
          ...state.team,
          users: state.team.users.filter(u => u._id !== action.payload),
          admins: state.team.admins.filter(u => u._id !== action.payload)
        }
      }
    }
    case 'UPDATE_TEAM': {
      return {
        ...state,
        team: action.payload
      }
    }
    case 'UPDATE_INFOS': {
      return {
        ...state,
        team: {
          ...state.team,
          name: action.payload.name,
          visibility: action.payload.visibility
        }
      }
    }
    case 'ADD_TEAM_BOARD': {
      let newBoards = state.team.boards.slice()
      if (state.team._id === action.payload.teamId) {
        newBoards.push(action.payload.board)
      }
      return {
        ...state,
        team: {
          ...state.team,
          boards: newBoards
        }
      }
    }
    default:
      return {
        ...state
      }
  }
}
