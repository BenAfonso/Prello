import React from 'react'
//import Card from '../Card/Card'
import Card from '../Card/DraggableCard'
import styles from './List.styles'
import { connect } from 'react-redux'
import { addCard, moveList } from '../../store/actions'
import { DragSource, DropTarget } from 'react-dnd'
import { ItemTypes, OFFSET_HEIGHT, CARD_HEIGHT, CARD_MARGIN } from '../Constants'
import { PropTypes } from 'prop-types'
import { updateLists, moveCardAction } from '../../store/actions'
import Button from '../UI/Button/Button'

function getPlaceholderIndex(y, scrollY) {
  // shift placeholder if y position more than card height / 2
  const yPos = y - OFFSET_HEIGHT + scrollY;
  let placeholderIndex;
  if (yPos < CARD_HEIGHT / 2) {
    placeholderIndex = -1; // place at the start
  } else {
    placeholderIndex = Math.floor((yPos - CARD_HEIGHT / 2) / (CARD_HEIGHT + CARD_MARGIN));
  }
  return placeholderIndex;
}

const listSource = {
  beginDrag (props) {
    return {
      id: props.id,
      originalIndex: props.findList(props.id).index,
    }
  },

  endDrag (props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem()
    moveList(props.dispatch, props.board._id, droppedId, props.index)
  }
}

const cardTarget = {
  canDrop () {
    return true
  },

  drop(props, monitor, component) {
    document.getElementById(monitor.getItem().id).style.display = 'block';
    const { placeholderIndex } = component.state
    const lastX = monitor.getItem().listIndex
    const lastY = monitor.getItem().index
    const nextX = props.index
    let nextY = placeholderIndex

    if (lastY > nextY) { // move top
      nextY += 1
    } else if (lastX !== nextX) { // insert into another list
      nextY += 1
    }

    if (lastX === nextX && lastY === nextY) { // if position equel
      return
    }

    console.log('lastX '+lastX+' lastY '+lastY+ 'nextX '+ nextX+ ' nextY '+nextY)
    moveCardAction(props.dispatch, lastY, lastX, nextX, nextY)
  }
}

const listTarget = {
  canDrop () {
    return false
  },

  hover (props, monitor) {
    const { id: draggedId } = monitor.getItem()
    const { id: overId } = props

    if (draggedId !== overId) {
      const { index: overIndex } = props.findList(overId)
      props.moveList(draggedId, overIndex)
    }
  },

}

@connect(store => {
  return {
    board: store.board
  }
})
//List can be hovered by another dragged list
@DropTarget(ItemTypes.LIST, listTarget, connect => ({
  connectListDropTarget: connect.dropTarget()
}))
//List can be the target of a card drag and drop
@DropTarget(ItemTypes.CARD, cardTarget, (connectDragSource, monitor) => ({
  connectCardDropTarget: connectDragSource.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  item: monitor.getItem()
}))
//List are draggable
@DragSource(ItemTypes.LIST, listSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class List extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool,
    canDrop: PropTypes.bool,
    id: PropTypes.any,
    title: PropTypes.string.isRequired,
    moveList: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      placeholderIndex: undefined,
      isScrolling: false,
      newCardFormDisplayed: false
    }

    this.addCard = this.addCard.bind(this)
    this.displayNewCardForm = this.displayNewCardForm.bind(this)
    this.undisplayNewCardForm = this.undisplayNewCardForm.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.removeAction = this.removeAction.bind(this)
  }

  displayNewCardForm () {
    this.setState({
      newCardFormDisplayed: true
    })
  }

  undisplayNewCardForm () {
    this.setState({
      newCardFormDisplayed: false
    })
  }

  moveCard(card, beforeListIndex, beforePosition, afterListIndex, afterPosition) {
    //const {card, listIndex} = this.findCard(cardId)
    //this.props.board.lists.foreach((list => findCard(id))
    let lists = this.props.board.lists.slice()
    lists[beforeListIndex].splice(beforePosition, 1)
    lists[afterListIndex].splice(afterPosition, 0, card)
    updateLists(this.props.dispatch, lists)

  }

  clearForm () {
    this.newCardTitle = ''
  }

  addCard () {
    if (this.newCardTitle !== '') {
      addCard(this.props.dispatch, this.props.index, this.props.board.lists[this.props.index], this.newCardTitle.value)
      this.clearForm()
    }
    this.undisplayNewCardForm()
  }
  
  findCard (id) {
    const card = this.filter((card) => id === card.id)
    return card.length === 0 ? undefined : {card: card[0], listIndex: this.props.index}
  }

  removeAction () {
    this.props.removeAction(this.props.index)
  }

  render () {
    const { title, isDragging, connectDragSource, connectListDropTarget, connectCardDropTarget } = this.props
    return connectDragSource(connectListDropTarget(connectCardDropTarget(
      <div className='host' style={{
        opacity: isDragging ? 0.3 : 1
      }}>
        <div className='title'>{title}</div>
        <div className='removeButton' onClick={this.removeAction}> X </div>
        <ul>
          {
            this.props.cards.map((card, i) => (
              <li id={card._id} key={i}>
                <Card index={i} id={card._id} moveCard={this.moveCard} listIndex={this.props.index} content={card.text} />
              </li>
            ))
          }
          <li>
            {
              this.state.newCardFormDisplayed
              ? <div className='newCardForm'>
                <form onSubmit={this.addCard}>
                  <textarea
                    ref={(t) => { this.newCardTitle = t }}
                  />
                </form>
                <div className='newCardFormButtons'>
                  <div>
                    <Button
                      bgColor={'#5AAC44'}
                      gradient
                      bold
                      shadow
                      onClick={this.addCard}>
                      Add
                    </Button>
                  </div>
                  <div>
                    <Button
                      bgColor={'#444'}
                      gradient
                      shadow
                      onClick={this.undisplayNewCardForm}>
                     Cancel
                    </Button>
                  </div>
                </div>
              </div>
              : <div className='newCardButton'onClick={this.displayNewCardForm}>Add a card...</div>
            }
          </li>
        </ul>
        <style jsx>{styles}</style>
      </div>
    )))
  }
}
