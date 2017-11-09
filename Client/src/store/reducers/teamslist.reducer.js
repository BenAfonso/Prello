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
      console.log(action.payload)
      return {
        ...state.teamslist,
        teams: action.payload
      }
    }
    default:
      return {
        ...state
      }
  }
}
