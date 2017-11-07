import { defaultCurrentUserState } from '../store'

export default (state = defaultCurrentUserState, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state.currentUser,
        id: action.payload._id,
        name: action.payload.name,
        username: action.payload.username,
        picture: action.payload.picture
      }
    }
    case 'UPDATE_USER': {
      return {
        ...state,
        name: action.payload.name,
        username: action.payload.username,
        picture: action.payload.picture
      }
    }
    default:
      return {
        ...state
      }
  }
}
