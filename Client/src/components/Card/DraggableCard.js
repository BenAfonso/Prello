import React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { ItemTypes } from '../Constants'
import { connect } from 'react-redux'

import Card from './Card';


function getStyles(isDragging) {
  return {
    display: isDragging ? 0.5 : 1
  }
}

const cardSource = {
  beginDrag(props, monitor, component) {
    // dispatch to redux store that drag is started
    const { id, content, listIndex, index } = props

    const { clientWidth, clientHeight } = findDOMNode(component)

    return { id, content, listIndex, index, clientWidth, clientHeight }
  },
  endDrag(props, monitor) {
    document.getElementById(monitor.getItem().id).style.display = 'block'
    //props.stopScrolling()
  },
  isDragging(props, monitor) {
    const isDragging = props && props.id === monitor.id
    return true
  }
}

// options: 4rd param to DragSource https://gaearon.github.io/react-dnd/docs-drag-source.html
const OPTIONS = {
  arePropsEqual: function arePropsEqual(props, otherProps) {
    let isEqual = true;
    if (props.id === otherProps.id &&
        props.listIndex === otherProps.listIndex &&
        props.index === otherProps.index
       ) {
      isEqual = true
    } else {
      isEqual = false
    }
    return isEqual
  }
}

function collectDragSource(connectDragSource, monitor) {
  return {
    connectDragSource: connectDragSource.dragSource(),
    connectDragPreview: connectDragSource.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

@connect(store => {
  return {
    board: store.board
  }
})

@DragSource(ItemTypes.CARD, cardSource, collectDragSource, OPTIONS)
export default class CardComponent extends React.Component {
  static propTypes = {
    id: PropTypes.any,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    isDragging: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    listIndex: PropTypes.number
    //stopScrolling: PropTypes.func
  }

  /*componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    })
  }*/

  render() {
    const { id, index, listIndex, isDragging, content, connectDragSource } = this.props;

    return connectDragSource(
      <div>
        <Card style={getStyles(isDragging)} id={id} index={index} listIndex={listIndex} content={content}/>
      </div>
    )
  }
}
