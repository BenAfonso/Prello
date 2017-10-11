import React from 'react'
import styles from './Boardslist.styles'
import BoardThumbnail from '../BoardThumbnail/BoardThumbnail'
import { connect } from 'react-redux'
import { setBoardslist } from '../../store/actions'
import HTML5Backend from 'react-dnd-html5-backend'
import { ItemTypes } from '../Constants'
import Button from '../UI/Button/Button'

@connect(store => {
  return {
    boardslist: store.boardslist
  }
})

export default class Boardslist extends React.Component {
  constructor (props) {
    super(props)

    this.findBoard = this.findBoard.bind(this)
  }
  
  componentDidMount () {
    setBoardslist(this.props.dispatch)
  }
  
  findBoard (id) {
      const board = this.props.boardslist.boards.filter((l) => l._id === id)[0]
      return {
        board,
        index: this.props.boardslist.boards.indexOf(board)
      }
  }
  
  render () {

    console.log(this.props.boardslist.boards.map((board, i) => board.createdAt))

    return (<div className='host'>
      <h1>Mes boards favoris</h1>

      <ul>
        {
          this.props.boardslist.boards.sort((a,b)=>{new Date(b.createdAt) - new Date(a.createdAt)}).map((board, i) => board.isFavorite ? 
            <li key={board._id}>
              <BoardThumbnail
                id={board._id}
                title={board.title}
                index={i}
                findBoard={this.findBoard}
                isFavorite={board.isFavorite}
                background={board.background}
              />
            </li>
          : null)
        }
  
      </ul>


      <h1>Mes boards</h1>

      <ul>
        {
          this.props.boardslist.boards.sort((a,b)=>{new Date(b.createdAt) - new Date(a.createdAt)}).map((board, i) => (
            <li key={board._id}>
              <BoardThumbnail
                id={board._id}
                title={board.title}
                index={i}
                background={board.background}
                isFavorite={board.isFavorite}
              />
            </li>
          ))
        }
      </ul>
      <style jsx>{styles}</style>
    </div>
    )
  }
}