import React from 'react'
import Board from '../components/Board/Board'
import BoardLayout from '../layouts/board'
import PopupManager from '../components/PopupManager/PopupManager'

export default (props) => (
  <PopupManager>
    <BoardLayout>
      <Board
        _id={props.match.params.id}
      />
    </BoardLayout>
  </PopupManager>
)
