import { combineReducers } from 'redux'
import currentBoard from './board.reducer'
import boardslist from './boardslist.reducer'
import currentUser from './currentUser.reducer'
import notifications from './notifications.reducer'
import developers from './developers.reducer'
import dashboard from './dashboard.reducer'

export default combineReducers({
  currentUser,
  currentBoard,
  boardslist,
  notifications,
  developers,
  analytics: dashboard
})
