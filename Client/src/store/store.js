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
  currentBoard: {
    lists: [
      {
        title: 'TODO',
        cards: []
      },
      {
        title: 'WIP',
        cards: [
          {
            description: 'Work on Prello'
          }
        ]
      }
    ]
  }
}

export default () => {
  return createStore(reducer, { ...defaultState }, enhancer)
}
