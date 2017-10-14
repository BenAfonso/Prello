import React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { ItemTypes } from '../Constants'
import { connect } from 'react-redux'
import { updateLists } from '../../store/actions'
import Card from './Card';


function getStyles(isDragging) {
  return {
    opacity: isDragging ? 0.5 : 1
  }
}

const cardSource = {

  beginDrag(props, monitor, component) {
    return {
      id: props.id,
      originalIndex: props.index,
      originalListIndex: props.listIndex
    }
  },
  endDrag(props, monitor) {
    // Use monitor.getItem()    
    console.log("Card dropped") 
  }
}

const cardTarget = {
  canDrop () {
    return false
  },

  hover (props, monitor) {
    const { id: draggedId } = monitor.getItem()
    const { id: overId } = props
    let { originalIndex, originalListIndex } = monitor.getItem()
    let newListIndex = props.listIndex
    let newIndex = props.index

    let originalList = props.board.lists.filter((l, listIndex) => {
      let cardss = l.cards.filter((c, cIndex) => {
        return c._id === draggedId
      })
      return cardss.length >0
    })[0]
    originalListIndex = props.board.lists.indexOf(originalList)
    let lastC = originalList.cards.filter((e, i) => e._id === draggedId)
    originalIndex = props.board.lists[originalListIndex].cards.indexOf(lastC[0])
    if (draggedId !== overId) {      
      let newLists = props.board.lists.slice()
      let card = props.board.lists[originalListIndex].cards.slice()[originalIndex]
      newLists[originalListIndex].cards.splice(originalIndex, 1)
      newLists[newListIndex].cards.splice(newIndex, 0, card)
      updateLists(props.dispatch, newLists)
    }
  },
}

@connect(store => {
  return {
    board: store.board
  }
})
@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectCardDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  //connectDragPreview: connectDragSource.dragPreview(),  
  isDragging: monitor.isDragging()
}))
export default class CardComponent extends React.Component {
  static propTypes = {
    id: PropTypes.any,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    isDragging: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    listIndex: PropTypes.number,
    findCard: PropTypes.func,
    moveCard: PropTypes.func
  }

  render() {
    const { id, index, listIndex, isDragging, content, connectCardDropTarget, connectDragSource, findCard, moveCard } = this.props;

    return connectCardDropTarget(connectDragSource(
      <div>
        <Card style={{ opacity: isDragging ? 0.5 : 1 }} id={id} findCard={findCard} moveCard={moveCard} index={index} listIndex={listIndex} content={content} />
      </div>
    ))
  }
}
