import React from 'react'
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

  isCurrentUserOwner () {
    if (this.props.board.owner !== undefined) {
      const isAdmin = this.props.currentUser._id === this.props.board.owner._id
      return isAdmin
    } else {
      return false
    }
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
          <div className='host'>
            <Droppable droppableId={`${this.props.index + 1}`}>
              {(dropProvided, dropSnapshot) => (
                <ul ref={dropProvided.innerRef} style={{height: 'calc(100vh - 340px)'}}>
                  {
                    [{text: 'Aeaz'}, {text: 'zaeazeee'}, {text: 'zaeza'}].map((card, i) => (
                        <Draggable
                          key={title + 'droppable-' + i}
                          draggableId={title + 'droppable-' + i}
                        >
                          {(dragProvided, snapshot) => (
                            <div
                              ref={dragProvided.innerRef}
                              style={{
                                ...dragProvided.draggableStyle,
                                height: '60px',
                                backgroundColor: 'yellow',
                                userSelect: 'none'
                              }}
                              {...dragProvided.dragHandleProps}
                            >
                              {card.text}
                              <div style={{ backgroundColor: 'orange' }}>{dragProvided.placeholder}</div>
                            </div>
                          )}
                        </Draggable>
                    ))}
                  <div style={{ backgroundColor: 'red'}}>{dropProvided.placeholder}</div>
                </ul>
              )}
            </Droppable>
            <style jsx>{styles}</style>
          </div>
    )
  }
}
