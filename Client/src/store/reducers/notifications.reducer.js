import {defaultNotificationsState} from '../store'

export default (state = defaultNotificationsState, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      let newNotifs = state.elements.slice()
      newNotifs.push(action.payload)
      return {
        elements: newNotifs
      }
    }
    case 'REMOVE_NOTIFICATION': {
      let newNotifs = state.elements.slice(1, state.length)
      return {
        elements: newNotifs
      }
    }
    default:
      return {
        ...state
      }
  }
}
