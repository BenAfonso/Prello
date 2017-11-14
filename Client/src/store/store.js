import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/index'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
      {
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }
    )
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
)

export const defaultCurrentUserState = {
  username: '',
  name: '',
  picture: '',
  teams: []
}

export const defaultNotificationsState = {
  elements: []
}

export const defaultDevelopersState = {
  oauthClients: []
}

export const defaultBoardState = {
  fetching: false,
  fetched: false,
  error: null,
  board: {
    _id: '',
    title: '',
    lists: [],
    visibility: '',
    isArchived: false,
    background: '#fff',
    collaborators: [],
    labels: [],
    modifications: []
  }
}

export const defaultDashboardState = {
  fetching: false,
  fetched: false,
  error: null,
  boards: [],
  board: {
    _id: '',
    title: '',
    background: '#fff',
    provider: ''
  }
}

export const defaultBoardslistState = {
  boards: []
}

export const defaultTeamState = {
  fetching: false,
  fetched: false,
  error: null,
  boards: [],
  board: {
    _id: '',
    title: '',
    background: '#fff',
    provider: ''
  }
}

export const defaultState = Object.assign(defaultCurrentUserState, defaultBoardState, defaultBoardslistState, defaultTeamState, defaultTeamslistState, defaultNotificationsState, defaultDevelopersState)
export default createStore(reducer, { ...defaultState }, enhancer)
