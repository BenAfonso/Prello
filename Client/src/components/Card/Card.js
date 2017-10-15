import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './Card.styles'

@connect(store => {
  return {
    board: store.board
  }
})
export default class Card extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    index: PropTypes.number.isRequired,
    listIndex: PropTypes.number.isRequired,
    id: PropTypes.any
  }

  static defaultProps = {
  }

  render () {
  return (
    <div style={{...this.props.style}} ref={c => this.card = c} className='root'>
      <div className='content'>{ this.props.content }</div>
      <style jsx>
        {styles}
      </style>
    </div>
  )}
}
