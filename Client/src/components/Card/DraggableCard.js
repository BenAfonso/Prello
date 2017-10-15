import React from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import { ItemTypes } from '../Constants'
import { connect } from 'react-redux'
import { updateLists } from '../../store/actions'
import { findDOMNode } from 'react-dom'
import { getEmptyImage } from 'react-dnd-html5-backend'
import Card from './Card'

const cardSource = {

  beginDrag(props, monitor, component) {
    const { clientWidth, clientHeight } = findDOMNode(component);
    return {
      id: props.id,
      originalIndex: props.index,
      originalListIndex: props.listIndex,
      clientWidth: clientWidth,
      clientHeight: clientHeight,
      ...props
    }
  },
  endDrag(props, monitor) {
  },
  isDragging(props, monitor) {
    const isDragging = props.id && props.id === monitor.getItem().id;
    return isDragging;
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
    const item = monitor.getItem();
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
  connectCardDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
export default class CardComponent extends React.Component {
  static propTypes = {
    id: PropTypes.any,
    connectCardDragSource: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    isDragging: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    listIndex: PropTypes.number
  }

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    });
  }

  render() {
    const { id, index, listIndex, isDragging, content, connectCardDropTarget, connectCardDragSource } = this.props;

    return connectCardDropTarget(connectCardDragSource(
      <div className='host' style={{position: 'relative'}}>
        <div className='overlay' style={{
          opacity: isDragging ? 1 : 0
        }} />
        <Card id={id} style={{ opacity: isDragging ? 0.3 : 1 }} index={index} listIndex={listIndex} content={content} />
        <style jsx>{`
          .overlay {
            position: absolute;
            background-color: #ccc;
            z-index: 10;
            height: 100%;
            width: 100%;
            border-radius: 3px;
          }
        `}</style>
      </div>
    ))
  }
}