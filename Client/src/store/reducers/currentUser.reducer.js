import { defaultCurrentUserState } from '../store'

export default (state = defaultCurrentUserState, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state.currentUser,
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