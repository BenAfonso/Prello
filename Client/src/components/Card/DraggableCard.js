import React from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import { ItemTypes } from '../Constants'
import {connect} from 'react-redux'
import {updateLists} from '../../store/actions'
import { findDOMNode } from 'react-dom'
import { getEmptyImage } from 'react-dnd-html5-backend'
import Card from './Card'
import CardDetails from './CardDetails/CardDetails'

const cardSource = {
  beginDrag (props, monitor, component) {
    const { clientWidth, clientHeight } = findDOMNode(component)
    return {
      id: props.id,
      originalIndex: props.index,
      originalListIndex: props.listIndex,
      clientWidth: clientWidth,
      clientHeight: clientHeight,
      ...props
    }
  },
  endDrag (props, monitor) {
  },
  isDragging (props, monitor) {
    const isDragging = props.id && props.id === monitor.getItem().id
    return isDragging
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
      let cards = l.cards.filter((c, cIndex) => {
        return c._id === draggedId
      })
      return cards.length > 0
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
  }
}

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board
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
    listId: PropTypes.any,
    connectCardDragSource: PropTypes.func.isRequired,
    checklists: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      index: PropTypes.number,
      items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.any,
        index: PropTypes.number,
        text: PropTypes.string.isRequired,
        isChecked: PropTypes.boolean,
        doneDate: PropTypes.instanceOf(Date)
      }))
    })),
    content: PropTypes.string.isRequired,
    shadowColor: PropTypes.any,
    isDragging: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    collaborators: PropTypes.arrayOf(PropTypes.any),
    responsible: PropTypes.any,
    bgColor: PropTypes.any,
    listIndex: PropTypes.number
  }

  static defaultProps = {
    checklists: []
  }

  componentDidMount () {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    })
  }

  displayCardDetails () {
    this.props.popoverManager.setRenderedComponent(
      <CardDetails {...this.props} dismissPopover={this.props.popoverManager.dismissPopover} />
    )
    this.props.popoverManager.displayPopover()
  }

  render () {
    const {
      id,
      checklists,
      index,
      nbChecklists,
      nbComments,
      bgColor,
      shadowColor,
      listIndex,
      isDragging,
      content,
      connectCardDropTarget,
      connectCardDragSource,
      collaborators,
      responsible } = this.props
    return connectCardDropTarget(connectCardDragSource(
      <div className='host' style={{position: 'relative'}} onClick={this.displayCardDetails.bind(this)}>
        <div className='overlay' style={{
          display: isDragging ? 'block' : 'none',
          opacity: isDragging ? 1 : 0,
          backgroundColor: shadowColor
        }} />

        <Card
          id={id}
          style={{ opacity: isDragging ? 0.3 : 1, backgroundColor: bgColor }}
          index={index}
          listIndex={listIndex}
          content={content}
          nbComments={nbComments}
          nbChecklists={nbChecklists}
          checklists={checklists}
          collaborators={
            collaborators.map(c => c._id
              ? c
              : this.props.board.collaborators.filter(c2 => c === c2._id)[0])
          }
          responsible={
            responsible
              ? responsible._id
                ? responsible
                : this.props.board.collaborators.filter(c => c._id === responsible)[0]
              : undefined
          } />
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
