import { defaultState } from '../store/store'
import reducer from '../store/reducer'

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })
})
