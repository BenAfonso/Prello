import React from 'react'

export default class Card extends React.Component {

  constructor (props) {
    super(props)

    this.drop = this.drop.bind(this)
    this.drag = this.drag.bind(this)
    this.allowDrop = this.allowDrop.bind(this)
  }

  render () {
    return (
      <div draggable='true' ondragstart={this.drag} ondragover={this.allowDrop} ondrop={this.drop}>
        {this.props.content}
      </div>
    )
  }

  drop (event) {
    event.preventDefault()
  }

  drag (event) {

  }

  allowDrop (event) {
    event.preventDefault()
  }
}
