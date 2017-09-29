import React from 'react'
import styles from './Header.styles'
import PropTypes from 'prop-types'

export default class Header extends React.Component {

  static propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string
  }

  static defaultProps = {
    bgColor: 'orange',
    color: 'white'
  }
  render () {
    return <div className='host' style={{
      backgroundColor: this.props.bgColor,
      color: this.props.color
      }}>

      <span id='title'>Prello</span>

      <style jsx>{styles}</style>
    </div>
  }
}
