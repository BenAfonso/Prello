import { defaultTeamslistState } from '../store'

export default (state = defaultTeamslistState, action) => {
  switch (action.type) {
    case 'ADD_TEAM': {
      let newTeams = state.teams.slice()
      newTeams.push(action.payload)
      return {
        ...state.teamslist,
        teams: newTeams
      }
    }
    case 'FETCH_TEAMSLIST_SUCCESS': {
      return {
        ...state.teamslist,
        teams: action.payload
      }
    }
    case 'ADD_TEAM_BOARD': {
      let newTeams = state.teams.map((t) => {
        if (t._id === action.payload.teamId) {
          t.boards.push(action.payload.board)
        }
        return t
      })
      return {
        ...state,
        teamslist: {
          ...state.teamslist,
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
