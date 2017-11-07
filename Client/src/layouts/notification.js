import React from 'react'
import { connect } from 'react-redux'
import Notification from '../components/UI/Notification/Notification'
import { removeNotification } from '../store/actions'

@connect(store => {
  return {
    notifications: store.notifications.elements
  }
})
export default class NotificationContainer extends React.Component {
  renderNotification (notification, index) {
    return (
      <div className='notification' key={notification.id}>
        <Notification
          title={notification.title}
          content={notification.content}
          type={notification.type}
          dismiss={() => { removeNotification(notification.id) }}
        />
        <style jsx>{`
          .notification {
            z-index: 1000;
            margin-bottom: 10px;
          }
        `}</style>
      </div>
    )
  }

  render () {
    return (
      <div style={{height: '100%'}}>
        {this.props.children}
        {
          this.props.notifications.length > 0
            ? <ul className='notifications'>
              {
                this.props.notifications.map((n, i) => (
                  this.renderNotification(n, i)
                ))
              }
            </ul>
            : null
        }
        <ul>

        </ul>
        <style jsx>{`
          ul.notifications {
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 10px;
            width: 300px;
          }
        `}</style>
      </div>
    )
  }
}
