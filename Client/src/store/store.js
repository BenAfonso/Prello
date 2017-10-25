import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

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

export const defaultState = {
  currentUser: {
    username: '',
    name: '',
    picture: ''
  },
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
    collaborators: []
  },
  boardslist: {
    boards: []
  }
}

export default createStore(reducer, { ...defaultState }, enhancer)
