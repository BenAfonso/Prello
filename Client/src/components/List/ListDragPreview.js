import React from 'react'
import PropTypes from 'prop-types'
import List from './List'

let styles = {
  display: 'inline-block',
  transform: 'rotate(5deg)',
  WebkitTransform: 'rotate(5deg)',
  width: '250px'
}

const propTypes = {
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool,
  isOver: PropTypes.bool,
  canDrop: PropTypes.bool,
  id: PropTypes.any,
  title: PropTypes.string.isRequired,
  moveList: PropTypes.func.isRequired
}

const ListDragPreview = (props) => {
  return (
    <div style={styles}>
      <List {...props} />
    </div>
  )
}

ListDragPreview.propTypes = propTypes

export default ListDragPreview
