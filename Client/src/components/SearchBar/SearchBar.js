import React from 'react'
import styles from './SearchBar.styles'
import {connect} from 'react-redux'
import DropDown from '../UI/DropDown/DropDown'

@connect(store => {
  return {
    boardslist: store.boardslist,
    teamslist: store.teamslist
  }
})

export default class SearchBar extends React.Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  constructor (props) {
    super(props)
    this.state = {
      barWidth: '200px'
    }
  }

  handleFocus (event) {
    event.target.select()
  }

  render () {
    let menuElements = []

    return (
      <div className='host'>
        <DropDown
          layout='custom'
          orientation='left'
          button={<input type='text' className='search-input' style={{ width: this.state.barWidth }} onFocus={this.handleFocus} />}
          title='Search'>
          <div style={{ width: '300px' }}>
            <ul>
              {
                menuElements.length > 0
                  ? null
                  : <li className='element'>
                    <div className='element-text'>Nothing! Yaaay</div>
                  </li>
              }
            </ul>
          </div>
        </DropDown>
        <style jsx>{styles}</style>
      </div>
    )
  }
}
