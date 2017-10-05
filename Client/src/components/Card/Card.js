import React from 'react'
import PropTypes from 'prop-types'
import styles from './Card.styles'
import { ItemTypes } from '../Constants'
import { DragSource } from 'react-dnd';
import { moveCardAction } from '../../store/actions'
import { DragDropContext } from 'react-dnd'

const cardSource = {
  beginDrag(props) {
    console.log('beginDrag card')
    console.log('props : ')
    console.log(props)
    return {
      id: props.id
    };
  },

  endDrag(props, monitor, component) {
    console.log('endDrag card')
    if(monitor.didDrop()) {
      const id = monitor.getItem()
      const dropResult = monitor.getDropResult()
      moveCardAction(props.dispatch, props.id, props.listIndex, dropResult.listIndex)
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
