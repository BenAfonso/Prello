import React from 'react'
import Header from '../components/Header/Header'
import Root from './root'
import {connect} from 'react-redux'

@connect(store => {
  return {
    currentUser: store.currentUser
  }
})
export default class Page extends React.Component {
  render () {
    return (
      <Root>
        <Header
          currentUser={this.props.currentUser}
          createBoardButton
        />
        <div className='content' style={{height: 'calc(100% - 40px)'}}>
          {this.props.children}
        </div>
      </Root>
    )
  }
}
