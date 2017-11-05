import React from 'react'
import NotificationContainer from './notification'

export default class Root extends React.Component {
  render () {
    return (
      <NotificationContainer>
        <div style={{height: '100%'}}>
          {this.props.children}
        </div>
      </NotificationContainer>
    )
  }
}
