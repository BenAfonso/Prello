import React from 'react'
import PropTypes from 'prop-types'
import styles from './Card.styles'
import { ItemTypes } from '../Constants'
import { DragSource } from 'react-dnd';
import { moveCardAction } from '../../store/actions'
import { DragDropContext } from 'react-dnd'

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      content: props.content
    };
  },

  endDrag(props, monitor, component) {
    if(monitor.didDrop()) {
      const id = monitor.getItem()
      const dropResult = monitor.getDropResult()

    }
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@DragSource(ItemTypes.CARD, cardSource, collect)
export default class Card extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    isDragging: PropTypes.bool.isRequired

  }

  static defaultProps = {
  }

  render () {
    const connectDragSource = this.props.connectDragSource
    const isDragging = this.props.isDragging
    return connectDragSource(
      <div style={{ opacity: isDragging ? 0.5 : 1 }} className='root'>
        { this.props.content }
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}
