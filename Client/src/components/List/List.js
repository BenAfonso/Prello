import React from 'react'
import Card from '../Card/Card'
import styles from './List.styles'
import { connect } from 'react-redux'
import { addCard } from '../../store/actions'
import { DragSource, DropTarget } from 'react-dnd'
import { ItemTypes } from '../Constants'
import { PropTypes } from 'prop-types'
import Button from '../UI/Button/Button'

const listSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findList(props.id).index
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem() 
    console.log(`list ${droppedId}: ${originalIndex} -> ${props.index}`)
  }
};

const listTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findList(overId);
      props.moveList(draggedId, overIndex);
    }
  },
};

@connect(store => {
  return {
    board: store.board
  }
})
@DropTarget(ItemTypes.LIST, listTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.LIST, listSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class List extends React.Component {

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any,
    title: PropTypes.string.isRequired,
    moveList: PropTypes.func.isRequired,
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
      addCard(this.props.dispatch, this.props.index, this.newCardTitle.value)
      this.clearForm()
    }
    this.undisplayNewCardForm()
  }

  render () {
    const { title, isDragging, connectDragSource, connectDropTarget } = this.props;

    return connectDragSource(connectDropTarget(
      <div className='host' style={{
          opacity: isDragging ? 0 : 1
        }}>
        <div className='title'>{title}</div>
        <ul>
          {
            this.props.cards.map((card, i) => (
              <li key={i}>
                <Card content={card.description} />
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
