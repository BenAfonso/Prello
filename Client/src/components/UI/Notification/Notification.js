import React from 'react'
import styles from './Notification.styles'
import PropTypes from 'prop-types'
import {TimelineMax} from 'gsap'
import GSAP from 'react-gsap-enhancer'

class Notification extends React.Component {
  dismissNotification () {
    this.addAnimation(this.animateDisappear, {
      onComplete: this.props.dismiss
    })
  }

  componentDidMount () {
    this.addAnimation(this.animateAppear, {
      onComplete: setTimeout(() => {
        this.dismissNotification()
      }, this.props.displayTime)
    })
  }

  animateAppear (utils) {
    let notification = utils.target.find({ name: 'notification' })
    let topBar = utils.target.find({ name: 'topBar' })
    return new TimelineMax()
      .from(notification, 0.5, { left: '400px' })
      .from(topBar, 0.5, { scaleX: 0 })
  }

  animateDisappear (utils) {
    let notification = utils.target.find({ name: 'notification' })
    let topBar = utils.target.find({ name: 'topBar' })
    return new TimelineMax({ onComplete: utils.options.onComplete })
      .to(topBar, 0.5, { scaleX: 0 })
      .to(notification, 0.5, { opacity: 0 })
      .to(topBar, 0, { scaleX: 1 })
      .to(notification, 0, { opacity: 1 })
  }

  render () {
    return (
      <div>
        <div className='notification' name='notification' onClick={this.props.dismissable ? this.dismissNotification.bind(this) : () => {}}>
          <div name='topBar' className={`topBar ${this.props.type}`} />
          <div className='title'>
            {this.props.title || this.props.type}
          </div>
          <div className='content'>
            {this.props.content}
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}

Notification.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  displayTime: PropTypes.number,
  dismissable: PropTypes.bool
}

Notification.defaultProps = {
  displayTime: 5000,
  dismissable: true
}

export default GSAP(Notification)
