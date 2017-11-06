import { combineReducers } from 'redux'
import currentBoard from './board.reducer'
import boardslist from './boardslist.reducer'
import currentUser from './currentUser.reducer'
import currentTeam from './team.reducer'
import teamslist from './teamslist.reducer'
import notifications from './notifications.reducer'

export default combineReducers({
  currentUser,
  currentBoard,
  boardslist,
  currentTeam,
  teamslist,
  notifications
})
