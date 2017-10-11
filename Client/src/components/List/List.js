import React from 'react'
import Card from '../Card/Card'
import styles from './List.styles'
import { connect } from 'react-redux'
import { addCard, moveList } from '../../store/actions'
import { DragSource, DropTarget } from 'react-dnd'
import { ItemTypes } from '../Constants'
import { PropTypes } from 'prop-types'
import { updateLists } from '../../store/actions'
import Button from '../UI/Button/Button'

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
    if (!monitor.didDrop()) {
      return {
        listIndex: props.index,
        isList: true,
        length: props.cards.length
      }
    }
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
@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectCardDropTarget: connect.dropTarget()
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
    id: PropTypes.any,
    title: PropTypes.string.isRequired,
    moveList: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
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
              <li key={i}>
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
