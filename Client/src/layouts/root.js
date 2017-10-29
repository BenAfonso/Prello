import React from 'react'
import NotificationContainer from './notification'

export default (props) => (
  <NotificationContainer>
    <div style={{height: '100%'}}>
      {props.children}
    </div>
  </NotificationContainer>
)
