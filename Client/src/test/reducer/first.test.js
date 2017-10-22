import { defaultState } from '../../store/store'
import reducer from '../../store/reducer'

describe('Initial reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })
})
