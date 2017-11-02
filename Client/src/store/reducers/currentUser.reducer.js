import { defaultCurrentUserState } from '../store'

export default (state = defaultCurrentUserState, action) => {
  switch (action.type) {
    case 'SET_USER': {
      console.log(action.payload)
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
        ...state.currentUser,
        name: action.payload.name,
        username: action.payload.username
      }
    }
    default:
      return {
        ...state
      }
  }
}
