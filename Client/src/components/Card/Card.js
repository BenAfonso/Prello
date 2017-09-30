import React from 'react'
import PropTypes from 'prop-types'
import styles from './Card.styles'

export default class Card extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
  }

  static defaultProps = {
  }

  render () {
    return (
      <div
        className='root'
      >
        { this.props.content }
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}
