import React from 'react'

export default class Card extends React.Component {

  constructor (props) {
    super(props)

    this.drop = this.drop.bind(this)
    this.drag = this.drag.bind(this)
    this.allowDrop = this.allowDrop.bind(this)
  }

  drop (event) {
    event.preventDefault()
  }

  drag (event) {

  }

  allowDrop (event) {
    event.preventDefault()
  }

  render () {
    return (
      <div draggable='true' style={{height: '200px', width: '200px', backgroundColor: 'black'}}ondragstart={this.drag} ondragover={this.allowDrop} ondrop={this.drop}>
        {this.props.content}
      </div>
    )
  }
}
