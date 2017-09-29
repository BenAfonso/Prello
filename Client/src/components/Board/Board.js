import React from 'react'
import styles from './Board.styles'
import List from '../List/List'
import { connect } from 'react-redux'
import { addList } from '../../store/actions'

@connect(store => {
  return {
    board: store.currentBoard
  }
})
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

  addList () {
    if (this.title.value !== '') {
      addList(this.props.dispatch, this.title.value)
      this.clearForm()
      this.undisplayNewListForm()
    } 
  }

  clearForm () {
    this.title = ''
  }

  render () {
    return <div className='host'>
      <ul>
        {
          this.props.board.lists.map((list, i) => (
            <li key={i}><List title={list.title} cards={list.cards}/></li>
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
  }
}
