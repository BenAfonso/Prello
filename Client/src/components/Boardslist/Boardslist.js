import React from 'react'
import styles from './Boardslist.styles'
import BoardThumbnail from '../BoardThumbnail/BoardThumbnail'
import { connect } from 'react-redux'
import { addBoard, setBoardslist, updateBoards, removeBoard } from '../../store/actions'
import { DragDropContext, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { ItemTypes } from '../Constants'
import Button from '../UI/Button/Button'

const boardTarget = {
    drop () {
    }
  }
  
  @connect(store => {
    return {
      boardslist: store.boardslist
    }
  })
  @DragDropContext(HTML5Backend)
  @DropTarget(ItemTypes.LIST, boardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))

export default class Boardslist extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newBoardFormDisplayed: false
    }

    this.displayNewBoardForm = this.displayNewBoardForm.bind(this)
    this.undisplayNewBoardForm = this.undisplayNewBoardForm.bind(this)
    this.addBoard = this.addBoard.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.moveBoard = this.moveBoard.bind(this)
    this.findBoard = this.findBoard.bind(this)
    this.removeBoard = this.removeBoard.bind(this)
  }
  
  componentDidMount () {
    setBoardslist(this.props.dispatch)
  }
  
  displayNewBoardForm () {
    this.setState({
      newBoardFormDisplayed: true
    })
  }
  
  undisplayNewBoardForm () {
    this.setState({
      newBoardFormDisplayed: false
    })
  }
  
  findBoard (id) {
      const board = this.props.boardslist.boards.filter((l) => l._id === id)[0]
      return {
        board,
        index: this.props.boardslist.boards.indexOf(board)
      }
  }
  
  removeBoard (atIndex) {
      removeBoard(this.props.dispatch, this.props.boardslist.boards[atIndex])
  }
  
  moveBoard (id, atIndex) {
    const {board, index} = this.findBoard(id)
    let boards = this.props.boardslist.boards.slice()
    boards.splice(index, 1)
    boards.splice(atIndex, 0, board)
    updateBoards(this.props.dispatch, boards)
  }
  
  addBoard () {
    if (this.title.value !== '') {
      addBoard(this.props.dispatch, this.title.value)
      this.clearForm()
      this.undisplayNewBoardForm()
    }
  }
  
  renderNewBoardForm () {
    return (
      <div className='newBoardForm'>
        <form onSubmit={this.addBoard}>
          <input type='text' placeholder='Add a board...' ref={(t) => { this.title = t }} />
        </form>
        <div className='newBoardFormButtons'>
          <div>
            <Button
              bgColor={'#5AAC44'}
              gradient
              bold
              shadow
              onClick={this.addBoard}>
              Add
            </Button>
          </div>
          <div>
            <Button
              bgColor={'#444'}
              gradient
              shadow
              onClick={this.undisplayNewBoardForm}>
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
    const {connectDropTarget} = this.props

    return connectDropTarget(<div className='host'>
      <h1> Mes boards </h1>

      <ul>
        {
          this.props.boardslist.boards.map((board, i) => (
            <li key={board._id}>
              <BoardThumbnail
                id={board._id}
                title={board.title}
                index={i}
                collaborators={board.collaborators}
                moveBoard={this.moveBoard}
                findBoard={this.findBoard}
                removeAction={this.removeBoard}
              />
            </li>
          ))
        }
          
  
        <li className='newBoard'>
          {
            this.state.newBoardFormDisplayed
            ? this.renderNewBoardForm()
            : <div className='newBoardButton' onClick={this.displayNewBoardForm}>Add a Board...</div>
          }
        </li>
  
      </ul>
      <style jsx>{styles}</style>
    </div>
    )
  }
}