import React from 'react'
import Card from '../Card/Card'
import styles from './List.styles'
import { connect } from 'react-redux'
import { addCard, moveList } from '../../store/actions'
import { DragSource, DropTarget } from 'react-dnd'
import { ItemTypes } from '../Constants'
import { PropTypes } from 'prop-types'
import Button from '../UI/Button/Button'

const listSource = {
  beginDrag (props) {
    console.log('beginDrag list')
    return {
      id: props.id,
      originalIndex: props.findList(props.id).index
    }
  },

  endDrag (props, monitor) {
    console.log('endDrag')
    const { id: droppedId, originalIndex } = monitor.getItem()
    moveList(props.dispatch, props.board._id, droppedId, props.index)
  }
}

const cardTarget = {
  canDrop () {
    return true
  },

  drop(props, monitor, component) {
    return {
      listIndex: props.index
    }
  }
}

@connect(store => {
  return {
    board: store.board
  }
})
@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
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

  removeAction () {
    this.props.removeAction(this.props.index)
  }

  render () {
    const { title, isDragging, connectDragSource, connectDropTarget } = this.props
    console.log(connectDropTarget)
    console.log('render List id '+this.props.index)
    return connectDragSource(connectDropTarget(
      <div className='host' style={{
        opacity: isDragging ? 0.3 : 1
      }}>
        <div className='title'>{title}</div>
        <div className='removeButton' onClick={this.removeAction}> X </div>
        <ul>
          {
            this.props.cards.map((card, i) => (
              <li key={i}>
                <Card index={i} listIndex={this.props.index} content={card.text} />
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
    ))
  }
}