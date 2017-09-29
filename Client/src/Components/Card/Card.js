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

  constructor (props) {
    super(props)

    this.drop = this.drop.bind(this)
    this.drag = this.drag.bind(this)
    this.allowDrop = this.allowDrop.bind(this)
  }

  drop (event) {
    event.preventDefault()
  }

  drag (event) {}

  allowDrop (event) {
    event.preventDefault()
  }

  render () {
    return (
      <div
        className='root'
        draggable='true'
        onDragStart={this.drag}
        onDragOver={this.allowDrop}
        onDrop={this.drop}>
        { this.props.content }
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}
