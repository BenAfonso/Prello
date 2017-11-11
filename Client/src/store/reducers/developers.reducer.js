import {defaultDevelopersState} from '../store'

export default (state = defaultDevelopersState, action) => {
  switch (action.type) {
    case 'SET_OAUTHCLIENTS': {
      return {
        oauthClients: action.payload
      }
    }
    case 'ADD_OAUTHCLIENT': {
      let newOauthClients = state.oauthClients.slice()
      newOauthClients.push(action.payload)
      return {
        oauthClients: newOauthClients
      }
    }
    case 'REMOVE_OAUTHCLIENT': {
      let newOauthClients = state.oauthClients.slice()
      action.payload
        ? newOauthClients = state.oauthClients.filter(e => e._id !== action.payload)
        : newOauthClients.splice(state.length, 1)
      return {
        oauthClients: newOauthClients
      }
    }
    default:
      return {
        ...state
      }
  }
}
