import React from 'react'
import styles from './Board.styles'
import List from '../List/List'
import { connect } from 'react-redux'
import { addList, setBoard, updateLists } from '../../store/actions'
import { DragDropContext, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';
import { ItemTypes } from '../Constants'

const listTarget = {
  drop() {
  },
};

@connect(store => {
  return {
    error: store.error,
    fetching: store.fetching,
    board: store.currentBoard
  }
})
@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.LIST, listTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
export default class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newListFormDisplayed: false,
      lists: ['TODO', 'WIP', 'DONE']
    }

    this.displayNewListForm = this.displayNewListForm.bind(this)
    this.undisplayNewListForm = this.undisplayNewListForm.bind(this)
    this.addList = this.addList.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.moveList = this.moveList.bind(this)
    this.findList = this.findList.bind(this);
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

  moveList(id, atIndex) {
    const { list, index } = this.findList(id)
    let lists = this.props.board.lists.slice()
    lists.splice(index, 1)
    lists.splice(atIndex, 0, list)
    updateLists(this.props.dispatch,lists) 
  }

  addList () {
    if (this.title.value !== '') {
      addList(this.props.dispatch, this.props.board._id, this.title.value)
      this.clearForm()
      this.undisplayNewListForm()
    } 
  }

  clearForm () {
    this.title = ''
  }

  render () {

    const { connectDropTarget } = this.props;

    return connectDropTarget(<div className='host'>
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
              />
            </li>
          ))
        }

        <li className='newList'>
          {
            this.state.newListFormDisplayed
            ? <div className='newListForm'>
              <form onSubmit={this.addList}>
                <input type='text' placeholder='Add a list...' ref={(t) => {this.title = t}}/>
              </form>
              <div className='newListFormButtons'>
                <div className='button confirm'
                  onClick={this.addList}></div>
                <div className='button cancel'
                  onClick={this.undisplayNewListForm}></div>
              </div>
            </div>
            : <div className='newListButton' onClick={this.displayNewListForm}>Add a list...</div>
          }
        </li>


      </ul>
      <style jsx>{styles}</style>
    </div>
    )}
}
