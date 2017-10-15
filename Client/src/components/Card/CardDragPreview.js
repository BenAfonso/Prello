import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card'

let styles = {
  display: 'inline-block',
  transform: 'rotate(5deg)',
  WebkitTransform: 'rotate(5deg)',
  width: '250px'
}

const propTypes = {
  id: PropTypes.any.isRequired,
  content: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  listIndex: PropTypes.number.isRequired
}

const CardDragPreview = (props) => {
  
  return (
    <div style={styles}>
      <Card {...props} />
    </div>
  )
}

CardDragPreview.propTypes = propTypes

export default CardDragPreview
