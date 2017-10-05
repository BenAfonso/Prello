import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './Card.styles'
import { ItemTypes } from '../Constants'
import { DragSource } from 'react-dnd';
import { moveCardAction } from '../../store/actions'
import { DragDropContext } from 'react-dnd'

const cardSource = {
  beginDrag(props) {
    return {
      index: props.index
    };
  },

  endDrag(props, monitor, component) {
    if(monitor.didDrop()) {
      const id = monitor.getItem()
      const dropResult = monitor.getDropResult()
      console.log(dropResult)
      if(props.listIndex !== dropResult.listIndex)
        moveCardAction(props.dispatch, props.index, props.listIndex, dropResult.listIndex)
    }
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@connect(store => {
  return {
    board: store.board
  }
})
@DragSource(ItemTypes.CARD, cardSource, collect)
export default class Card extends React.Component {

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    isDragging: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired
  }

  static defaultProps = {
  }

  componentDidMount () {
    this.card.addEventListener('mousepress', (e) => {
      e.stopPropagation()
    })
  }

  render () {
    const connectDragSource = this.props.connectDragSource
    const isDragging = this.props.isDragging
    return connectDragSource(
      <div style={{ opacity: isDragging ? 0.5 : 1 }} ref={c => this.card = c} className='root'>
        { this.props.content }

        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}
