import React from 'react'
import styles from './Board.styles'
import List from '../List/List'
import { connect } from 'react-redux'
import { addList, setBoard, updateLists, removeList } from '../../store/actions'
import { DragDropContext, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { ItemTypes } from '../Constants'
import Button from '../UI/Button/Button'

const listTarget = {
  drop () {
  }
}

@connect(store => {
  return {
    board: store.board
  }
})
@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.LIST, listTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newListFormDisplayed: false
    }

    this.displayNewListForm = this.displayNewListForm.bind(this)
    this.undisplayNewListForm = this.undisplayNewListForm.bind(this)
    this.addList = this.addList.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.moveList = this.moveList.bind(this)
    this.findList = this.findList.bind(this)
    this.removeList = this.removeList.bind(this)
  }

  componentDidMount () {
    setBoard(this.props.dispatch)
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
    const list = this.props.board.lists.filter((l) => l._id === id)[0]
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
    const {connectDropTarget} = this.props

    return connectDropTarget(<div className='host'>
      <h1>{this.props.board.title}</h1>
      <ul>
        {
          this.props.board.lists.map((list, i) => (
            <li key={list._id}>
              <List
                id={list._id}
                title={list.name}
                index={i}
                cards={list.cards}
                moveList={this.moveList}
                findList={this.findList}
                removeAction={this.removeList}
              />
            </li>     
          ))
        }

        <li className='newList'>
          {
            this.state.newListFormDisplayed
            ? this.renderNewListForm()
            : <div className='newListButton' onClick={this.displayNewListForm}>Add a list...</div>
          }
        </li>

      </ul>
      <style jsx>{styles}</style>
    </div>
    )
  }
}
