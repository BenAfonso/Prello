import React from 'react'
import Board from '../components/Board/Board'
import BoardLayout from '../layouts/board'
import PopupManager from '../components/PopupManager/PopupManager'

export default (props) => (
  <PopupManager boardId={props.match.params.id}>
    <BoardLayout>
      <Board
        _id={props.match.params.id}
        cardId={props.match.params.cardId}
      />
    </BoardLayout>
  </PopupManager>
)
