import React from 'react'
import Board from '../components/Board/Board'
import BoardLayout from '../layouts/board'

export default (props) => (
  <BoardLayout>
    <Board 
      _id={props.match.params.id}
    />
  </BoardLayout>
)