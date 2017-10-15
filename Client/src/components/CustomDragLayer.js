import React from 'react'
import PropTypes from 'prop-types'
import { DragLayer } from 'react-dnd'
import CardDragPreview from './Card/CardDragPreview'
import ListDragPreview from './List/ListDragPreview'
import { ItemTypes } from './Constants'


const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  top: '0',
  left: '0',
  zIndex: 100000
}

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    WebkitTransform: transform,
    transform
  };
}

@DragLayer((monitor) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))
export default class CustomDragLayer extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired
  }

  renderItem(type, item) {
    switch (type) {
      case ItemTypes.CARD:
        return (
          <CardDragPreview {...item} />
        )
      case ItemTypes.LIST:
        return (
          <ListDragPreview {...item} />
        )
      default:
        return null
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props

    if (!isDragging) {
      return null
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    )
  }
}
