import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card'

const styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)'
}

const propTypes = {
  id: PropTypes.any.isRequired,
  content: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  listIndex: PropTypes.number.isRequired
}

const CardDragPreview = (props) => {
  styles.width = `${props.card.clientWidth || 243}px`
  styles.height = `${props.card.clientHeight || 243}px`
  const {id, content, index, listIndex} = this.props

  return (
    <div style={styles}>
      <Card id={id} content={content} listIndex={listIndex} index={index} />
    </div>
  )
}

CardDragPreview.propTypes = propTypes

export default CardDragPreview
