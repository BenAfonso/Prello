import React from 'react'
import Card from '../Card/DraggableCard'
import styles from './List.styles'
import {connect} from 'react-redux'
import { addCard, archiveList, updateListName } from '../../store/actions'
import { PropTypes } from 'prop-types'
import Button from '../UI/Button/Button'
import ListMenu from './ListMenu/ListMenu'
import { Draggable, Droppable } from 'react-beautiful-dnd'

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board,
    currentUser: store.currentUser
  }
})
export default class List extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
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
    this.displayRenameList = this.displayRenameList.bind(this)
    this.undisplayRenameList = this.undisplayRenameList.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount () {
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside (event) {
    if (this.listName && !this.listName.contains(event.target)) {
      this.undisplayRenameList()
    }
  }

  handleFocus (event) {
    event.target.select()
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

  displayRenameList () {
    this.setState({
      renameListDisplayed: true
    })
  }

  undisplayRenameList (event) {
    if (event) event.preventDefault()
    if (this.listName.value !== '' && this.listName.value !== this.props.title) {
      this.updateListName(this.listName.value)
    }
    this.setState({
      renameListDisplayed: false
    })
  }

  updateListName (listName) {
    const list = this.props.findList(this.props.id).list
    updateListName(this.props.board._id, list, listName)
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

  renderRenameList () {
    return (
      <div className='rename-form'>
        <form onSubmit={this.undisplayRenameList}>
          <input autoFocus type='text' className='rename-input' defaultValue={this.props.title} ref={(name) => { this.listName = name }} onFocus={this.handleFocus}/>
        </form>
        <style jsx>{styles}</style>
      </div>
    )
  }

  render () {
    const { title } = this.props
    return (
      <Draggable
        draggableId={this.props.id}
        type="LIST">
        {(provided, snapshot) => (
          <div className='host'
            ref={provided.innerRef}
            style={{
              ...provided.draggableStyle
            }}
          >
            {
              this.state.renameListDisplayed
                ? this.renderRenameList()
                : <div
                  {...provided.dragHandleProps}
                  className='title'
                  onClick={this.displayRenameList}>{title}</div>
            }
            <div className='button'>
              <ListMenu archive={this.archive.bind(this)} />
            </div>
            <Droppable
              droppableId={this.props.id}
              type='CARD'
            >
              {(cardsProvided, cardSnapshot) => (
                <div>
                  <ul ref={cardsProvided.innerRef} style={{
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
                            comments={card.comments}
                            attachments={card.attachments}
                            content={card.text}
                            collaborators={card.collaborators}
                            responsible={card.responsible}
                            labels={card.labels}
                            popoverManager={this.props.popoverManager} />
                        </li>
                      ))
                    }
                    <div>{cardsProvided.placeholder}</div>
                  </ul>
                </div>
              )}
            </Droppable>
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
        )}
      </Draggable>
    )
  }
}
