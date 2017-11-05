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
      let newNotifs = state.elements.slice()
      action.payload
        ? newNotifs = state.elements.filter(e => e.id !== action.payload)
        : newNotifs.splice(state.length, 1)

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
