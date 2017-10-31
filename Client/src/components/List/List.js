import React from 'react'
import Card from '../Card/DraggableCard'
import styles from './List.styles'
import {connect} from 'react-redux'
import { addCard, moveList, moveCardDistant, updateLists, archiveList } from '../../store/actions'
import { DragSource, DropTarget } from 'react-dnd'
import { ItemTypes } from '../Constants'
import { PropTypes } from 'prop-types'
import { findDOMNode } from 'react-dom'
import Button from '../UI/Button/Button'
import { getEmptyImage } from 'react-dnd-html5-backend'
import ListMenu from './ListMenu/ListMenu'

const listSource = {
  beginDrag (props, monitor, component) {
    const { clientWidth, clientHeight } = findDOMNode(component)
    return {
      id: props.id,
      originalIndex: props.findList(props.id).index,
      clientWidth: clientWidth,
      clientHeight: clientHeight,
      ...props
    }
  },

  endDrag (props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem()
    if (originalIndex !== props.index) {
      moveList(props.dispatch, props.board._id, droppedId, props.index)
    }
  }
}

const cardTarget = {
  canDrop () {
    return true
  },

  hover (props, monitor) {
    const { id: draggedId, originalIndex, originalListIndex } = monitor.getItem()
    // TODO REPLACE WITH FINDCARD
    let originalList = props.board.lists.filter((l, listIndex) => {
      let cardss = l.cards.filter((c, cIndex) => {
        return c._id === draggedId
      })
      return cardss.length > 0
    })[0]
    let card = originalList.cards.filter((e, i) => e._id === draggedId)[0]

    if (props.cards.filter(c => !c.isArchived).length === 0) {
      let newLists = props.board.lists.slice()
      newLists[props.index].cards.push(card)
      newLists[originalListIndex].cards.splice(originalIndex, 1)
      updateLists(props.dispatch, newLists)
    }
  },
  drop (props, monitor) {
    const { id: draggedId, originalListIndex } = monitor.getItem()
    let card = props.cards.filter((e, i) => !e.isArchived && e._id === draggedId)[0]
    moveCardDistant(props.board._id, card._id, props.board.lists[originalListIndex]._id, props.id, props.cards.indexOf(card))
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
  }
}

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board
  }
})
// List can be hovered by another dragged list
@DropTarget(ItemTypes.LIST, listTarget, connect => ({
  connectListDropTarget: connect.dropTarget()
}))
// List can be the target of a card drop
@DropTarget(ItemTypes.CARD, cardTarget, (connectDragSource, monitor) => ({
  connectCardDropTarget: connectDragSource.dropTarget()
}))
// List are draggable
@DragSource(ItemTypes.LIST, listSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
export default class List extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool,
    isOver: PropTypes.bool,
    canDrop: PropTypes.bool,
    id: PropTypes.any,
    title: PropTypes.string.isRequired,
    moveList: PropTypes.func.isRequired,
    shadowColor: PropTypes.any
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

  clearForm () {
    this.newCardTitle = ''
  }

  archive () {
    let newLists = this.props.board.lists.slice()
    let updatedList = newLists.filter(l => l._id === this.props.id)
    archiveList(this.props.board._id, updatedList[0])
  }

  addCard () {
    if (this.newCardTitle !== '') {
      addCard(this.props.dispatch, this.props.board._id, this.props.id, this.newCardTitle.value)
      this.clearForm()
    }
    this.undisplayNewCardForm()
  }

  removeAction () {
    this.props.removeAction(this.props.index)
  }

  componentDidMount () {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    })
  }

  render () {
    const { title, shadowColor, isDragging, connectDragSource, connectListDropTarget, connectCardDropTarget } = this.props
    return connectDragSource(connectListDropTarget(connectCardDropTarget(
      <div className='host'
        ref={(l) => { this.host = l }}>
        { isDragging ? <div className='overlay' style={{backgroundColor: shadowColor}} /> : null }
        <div className='title'>{title}</div>
        <div className='button'>
          <ListMenu archive={this.archive.bind(this)} />
        </div>
        <ul ref={(l) => { this.cardContainer = l }} style={{
          maxHeight: this.state.newCardFormDisplayed
            ? 'calc(100vh - 340px)'
            : 'calc(100vh - 230px)'
        }}>
          {
            this.props.cards.map((card, i) => (
              { ...card, index: i }
            )).filter(card =>
              !card.isArchived
            ).map(card => (
              <li key={card._id}>
                <Card
                  index={card.index}
                  id={card._id}
                  checklists={card.checklists}
                  bgColor={this.props.primaryColor}
                  listId={this.props.id}
                  shadowColor={this.props.shadowColor}
                  listIndex={this.props.index}
                  content={card.text}
                  collaborators={card.collaborators}
                  popoverManager={this.props.popoverManager} />
              </li>
            ))
          }
        </ul>
        {
          this.state.newCardFormDisplayed
            ? <div className='newCardForm'>
              <form onSubmit={this.addCard}>
                <textarea
                  ref={(t) => { this.newCardTitle = t }}
                  onKeyPress={(e) => { return e.charCode === 13 ? this.addCard() : null }}
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
        <style jsx>{styles}</style>
      </div>
    )))
  }
}
