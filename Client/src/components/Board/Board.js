import React from 'react'
import styles from './Board.styles'
import List from '../List/List'
import {connect} from 'react-redux'
import { addList, setBoard, updateLists, removeList, resetBoard, updateBoardName } from '../../store/actions'
import { DragDropContext } from 'react-dnd'
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'
import Button from '../UI/Button/Button'
import { subscribeToBoard } from '../../services/api'
import CustomDragLayer from '../CustomDragLayer'
import PropTypes from 'prop-types'
import MultiBackend from 'react-dnd-multi-backend'
import {Redirect} from 'react-router-dom'

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board,
    currentUser: store.currentUser
  }
})
@DragDropContext(MultiBackend(HTML5toTouch))
export default class Board extends React.Component {
  static propTypes = {
    primaryColor: PropTypes.any,
    secondaryColor: PropTypes.any
  }

  static defaultProps = {
  }

  constructor (props) {
    super(props)
    this.state = {
      newListFormDisplayed: false,
      renameBoardDisplayed: false
    }

    this.displayNewListForm = this.displayNewListForm.bind(this)
    this.undisplayNewListForm = this.undisplayNewListForm.bind(this)
    this.displayRenameBoard = this.displayRenameBoard.bind(this)
    this.undisplayRenameBoard = this.undisplayRenameBoard.bind(this)
    this.addList = this.addList.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.moveList = this.moveList.bind(this)
    this.findList = this.findList.bind(this)
    this.removeList = this.removeList.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside)
    setBoard(this.props.dispatch, this.props._id).then(board => {
      subscribeToBoard(board)
    }).catch(err => {
      this.setState({ redirectTo: '/boards' })
      console.error(err)
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props._id !== nextProps._id) {
      setBoard(this.props.dispatch, this.props._id).then(board => {
        subscribeToBoard(board)
      }).catch(err => {
        this.setState({ redirectTo: '/boards' })
        console.error(err)
      })
    }
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
    resetBoard()
  }

  handleClickOutside (event) {
    if (this.boardName && !this.boardName.contains(event.target)) {
      this.undisplayRenameBoard()
    }
  }

  handleFocus (event) {
    event.target.select()
  }

  isCurrentUserOwner () {
    if (this.props.board.owner !== undefined) {
      const isAdmin = this.props.currentUser._id === this.props.board.owner._id
      return isAdmin
    } else {
      return false
    }
  }

  displayRenameBoard () {
    this.setState({
      renameBoardDisplayed: true
    })
  }

  undisplayRenameBoard (event) {
    if (event) event.preventDefault()
    if (this.boardName.value !== '' && this.boardName.value !== this.props.board.title) {
      this.updateBoardName(this.boardName.value)
    }
    this.setState({
      renameBoardDisplayed: false
    })
  }

  updateBoardName (boardName) {
    updateBoardName(this.props.board._id, boardName)
  }

  displayNewListForm () {
    this.setState({
      newListFormDisplayed: true
    })
  }

  undisplayNewListForm () {
    this.setState({
      newListFormDisplayed: false
    })
  }

  findList (id) {
    const list = this.props.board.lists.filter((l) => !l.isArchived && l._id === id)[0]
    return {
      list,
      index: this.props.board.lists.indexOf(list)
    }
  }

  removeList (atIndex) {
    removeList(this.props.dispatch, this.props.board._id, this.props.board.lists[atIndex])
  }

  moveList (id, atIndex) {
    const {list, index} = this.findList(id)
    let lists = this.props.board.lists.slice()
    lists.splice(index, 1)
    lists.splice(atIndex, 0, list)
    updateLists(this.props.dispatch, lists)
  }

  addList () {
    if (this.title.value !== '') {
      addList(this.props.dispatch, this.props.board._id, this.title.value)
      this.clearForm()
      this.undisplayNewListForm()
    }
  }

  renderRenameBoard () {
    return (
      <div className='rename-form'>
        <form onSubmit={this.undisplayRenameBoard}>
          <input autoFocus className='rename-input' defaultValue={this.props.board.title} ref={(name) => { this.boardName = name }} onFocus={this.handleFocus} />
        </form>
        <style jsx>{`
        .rename-form {
          padding: 15px;
        }

        .rename-input{
          border-radius: 3px;
          padding: 10px;
          font-size: 20px;
        }
        `}</style>
      </div>
    )
  }

  renderNewListForm () {
    return (
      <div className='newListForm'>
        <form onSubmit={this.addList}>
          <input type='text' placeholder='Add a list...' ref={(t) => { this.title = t }} />
        </form>
        <div className='newListFormButtons'>
          <div>
            <Button
              bgColor={'#5AAC44'}
              gradient
              bold
              shadow
              onClick={this.addList}>
          Add
            </Button>
          </div>
          <div>
            <Button
              bgColor={'#444'}
              gradient
              shadow
              onClick={this.undisplayNewListForm}>
         Cancel
            </Button>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }

  clearForm () {
    this.title = ''
  }

  render () {
    if (this.state.redirectTo) {
      return (<Redirect to={this.state.redirectTo} />)
    }

    const boardStyle = {
      backgroundColor: this.props.primaryColor
    }

    return <div className='host' style={boardStyle} >
      {
        this.state.renameBoardDisplayed
          ? this.renderRenameBoard()
          : <div className='boardTitle' onClick={this.isCurrentUserOwner() ? this.displayRenameBoard : null}>{this.props.board.title}</div>
      }
      <CustomDragLayer snapToGrid={false} />
      <ul>
        {
          this.props.board.lists.map((list, i) => (
            { ...list, index: i }
          )).filter(l =>
            !l.isArchived
          ).map(list => (
            <li key={list._id}>
              <List
                id={list._id}
                key={list._id}
                title={list.name}
                index={list.index}
                cards={list.cards}
                shadowColor={this.props.secondaryColor}
                moveList={this.moveList}
                findList={this.findList}
                removeAction={this.removeList}
                popoverManager={this.props.popoverManager}
              />
            </li>
          ))
        }

        <li className='newList' style={{
          backgroundColor: this.props.secondaryColor
        }}>
          {
            this.state.newListFormDisplayed
              ? this.renderNewListForm()
              : <div className='newListButton' onClick={this.displayNewListForm}>Add a list...</div>
          }
        </li>

      </ul>
      <style jsx>{styles}</style>
    </div>
  }
}
