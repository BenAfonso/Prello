import { combineReducers } from 'redux'
import currentBoard from './board.reducer'
import boardslist from './boardslist.reducer'
import currentUser from './currentUser.reducer'
import notifications from './notifications.reducer'
import developers from './developers.reducer'
import dashboard from './dashboard.reducer'
import currentTeam from './team.reducer'
import teamslist from './teamslist.reducer'

export default combineReducers({
  currentUser,
  currentBoard,
  boardslist,
  notifications,
  analytics: dashboard,
  currentTeam,
  teamslist,
  developers
})
