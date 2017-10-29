import React from 'react'
import { connect } from 'react-redux'

@connect(store => {
  return {
    notifications: store.notifications
  }
})
export default class NotificationContainer extends React.Component {
  renderNotification (notification) {
    return (
      <div className='notification'>
        <div className='title'>
          { notification.title }
        </div>
        <div className='content'>
          { notification.content }
        </div>
        <style jsx>{`
          .notification {
            z-index: 1000;
            background-color: white;
            width: calc(100% - 10px);
            height: 100px;
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 10px;
          }

          .title {
            font-weight: bold;
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
                this.props.notifications.map(n => (
                  this.renderNotification(n)
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
