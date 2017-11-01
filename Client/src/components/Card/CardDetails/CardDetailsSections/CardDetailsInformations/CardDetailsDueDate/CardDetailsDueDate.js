import React from 'react'
import {connect} from 'react-redux'

@connect(store => {
  return {
    currentBoard: store.currentBoard,
    board: store.currentBoard.board
  }
})

export default class CardDetailsDueDate extends React.Component {
  render () {
    // const list = this.props.board.lists[this.props.listIndex]
    // const card = list.cards.filter(c => c._id === this.props.id)[0]
    // const cardId = this.props.id

    return (
      <div className='host'>
        <style jsx>
          {`
            .host {
              display: flex;
            }
          `}
        </style>
      </div>
    )
  }
}
