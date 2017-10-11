import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './Card.styles'
import { ItemTypes } from '../Constants'
import { DragSource, DropTarget } from 'react-dnd';
import { moveCardAction } from '../../store/actions'

const cardSource = {
  beginDrag (props) {
    console.log('beginDrag')
    return {
      id: props.id,
      index: props.index,
      listIndex: props.listIndex,
    };
  },

  endDrag(props, monitor, component) {
    if (monitor.didDrop()) {
      const dropResult = monitor.getDropResult()
      //dropResult comes from Card -> We dropped on a card
      if(!dropResult.isList) {
        if((props.index !== dropResult.index && props.listIndex === dropResult.listIndex) || props.listIndex !== dropResult.listIndex){
          moveCardAction(props.dispatch, props.index, props.listIndex, dropResult.listIndex, dropResult.index + 1)
        }
      }
      //dropResult comes from List -> We dropped on a list
      else {
        moveCardAction(props.dispatch, props.index, props.listIndex, dropResult.listIndex, dropResult.length)
      }
    }
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const cardTarget = {
  canDrop () {
    return true
  },

  hover (props, monitor) {
    //const draggedCard = monitor.getItem()
    //const overId = props.id
    //if (draggedCard.id !== overId) {
      //console.log('props : '+ props)
      //console.log('trucs : '+draggedCard, draggedCard.listIndex, draggedCard.index, props.listIndex, props.index)
    //}
  },

  drop (props, monitor, component) {
    console.log('drop Card')
    return {
      listIndex: props.listIndex,
      index: props.index,
      isList: false
    }
  }

}

@connect(store => {
  return {
    board: store.board
  }
})
//Cards can be hovered by another dragged card
@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectCardDropTarget: connect.dropTarget()
}))
//Cards are draggable
@DragSource(ItemTypes.CARD, cardSource, collect)
export default class Card extends React.Component {

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    isDragging: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    id: PropTypes.any,
    moveCard: PropTypes.func.isRequired
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
    const connectCardDropTarget = this.props.connectCardDropTarget
    const isDragging = this.props.isDragging
    return connectCardDropTarget(connectDragSource(
      <div style={{ opacity: isDragging ? 0.5 : 1 }} ref={c => this.card = c} className='root'>
        { this.props.content }

        <style jsx>
          {styles}
        </style>
      </div>
    ))
  }
}
