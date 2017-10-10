import React from 'react'
import styles from './BoardThumbnail.styles'
import { connect } from 'react-redux'
import { moveBoard } from '../../store/actions'
import { DragSource, DropTarget } from 'react-dnd'
import { ItemTypes } from '../Constants'
import { PropTypes } from 'prop-types'

const boardSource = {
  beginDrag (props) {
    return {
        id: props.id,
        originalIndex: props.findBoard(props.id).index
    }
  },
  
  endDrag (props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem()
    moveBoard(props.dispatch, droppedId, props.index)
  }
}
  
const boardTarget = {
  canDrop () {
    return false
  },
  
  hover (props, monitor) {
    const { id: draggedId } = monitor.getItem()
    const { id: overId } = props
  
    if (draggedId !== overId) {
      const { index: overIndex } = props.findBoard(overId)
      props.moveBoard(draggedId, overIndex)
    }
  }
}


@connect(store => {
  return {
      
  }
})

@DropTarget(ItemTypes.BOARD, boardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))

@DragSource(ItemTypes.BOARD, boardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

export default class BoardThumbnail extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any,
    title: PropTypes.string.isRequired,
    moveBoard: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.removeAction = this.removeAction.bind(this)
  }

 
  removeAction () {
    this.props.removeAction(this.props.index)
  }

  render () {
    const { title, collaborators, isDragging, connectDragSource, connectDropTarget } = this.props

    return connectDragSource(connectDropTarget(
      <div className='host' style={{
        opacity: isDragging ? 0.3 : 1
      }}>
        <div className='title'>{title}</div>
        <div className='removeButton' onClick={this.removeAction}> X </div>
        <hr/>
        <div className='collaborators'> Collaborators : 
        <ul>
          {
            this.props.collaborators.map((collaborator, i) => (
                <li key={i}>
                {collaborator.name}
                </li>
              ))
          }
          </ul>
        </div>
        <style jsx>{styles}</style>
      </div>
    ))
  }
}
