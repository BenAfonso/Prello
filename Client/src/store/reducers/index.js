import { combineReducers } from 'redux'
import currentBoard from './board.reducer'
import boardslist from './boardslist.reducer'
import currentUser from './currentUser.reducer'
import notifications from './notifications.reducer'

export default combineReducers({
  currentUser,
  currentBoard,
  boardslist,
  notifications
})
